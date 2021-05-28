import { take } from "rxjs/operators";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { ProfileService } from "../service/profile.service";
import { ViewsProfileService } from "../service/views-profile.service";
import { NewsService } from "../service/news.service";
import { ModalController } from "@ionic/angular";
import { User } from "../models/IUser";
import { IPost } from "../models/iPost";
import { MsgProfileEditComponent } from "./msg-profile-edit/msg-profile-edit.component";
import { ReusableComponentsIonic } from "../service/ionicHelpers.service";
import { PrivateGalleryPreviewComponent } from "../components/gallery/private-gallery-preview/private-gallery-preview.component";

enum segmentOptions {
  profile = "profile",
  posts = "posts",
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  @ViewChild("reloadButton", { static: false }) reloadButton: any;
  @ViewChild("gallery", { static: false })
  gallery: PrivateGalleryPreviewComponent;

  public readonly segmentOptions = segmentOptions;

  segment: segmentOptions = segmentOptions.profile;

  landingButton: boolean = false;
  loadingPost: boolean;
  countPost = 0;
  user: User = this.userService.User;
  creator: boolean = true;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    private postService: PostService,
    public profileService: ProfileService,
    private viewsProfileService: ViewsProfileService,
    public newsService: NewsService,
    public cd: ChangeDetectorRef,
    public readonly reusableCI: ReusableComponentsIonic
  ) {
    if (this.userService.User.msgProfile == false) {
      this.editProfileMsg();
    }

    this.viewsProfileService
      .getProfileView(this.userService.User._id)
      .pipe(take(1))
      .subscribe((views: any) => {
        if (!views) return false;
        this.views = views.visits;
      });
    const uP = this.userService.User.profile_user;
    console.log(uP)
    if (
      uP === "club" ||
      uP === "representative" ||
      uP === "association" ||
      uP === "foundation" ||
      uP === "federation" ||
      uP === "sponsor"
    )
      this.landingButton = true;
    else this.landingButton = false;
  }

  /**
   * Este es la modal que aparece cuando el usuario se loguea por primera vez
   */
  async editProfileMsg() {
    let modal = await this.modalCtrl.create({
      component: MsgProfileEditComponent,
      cssClass: "msg-edit-modal",
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(() => {
      this.router.navigate(["/profile/edit"]);
    });

    modal.present();
  }

  news = [];
  posts: IPost[] = [];
  views: [];
  ngOnInit() {
    this.newsService
      .findUserNews(this.userService.User._id)
      .subscribe((response: any) => {
        this.news = response; /* .filter((news)=>{
          return news.stream == false;
        })*/
      });

    this.getPost();
    this.getCountPost();
    this.postService.newPostObservable().subscribe((id) => {
      this.newPost(id);
    });
  }

  /**
   * Busca una publicacion creada
   * @param id id de la pubublicacion
   */
  newPost(id) {
    this.postService
      .getPost(id)
      .toPromise()
      .then((post: IPost) => {
        // una vez tenga todos los datos de esa publicacion, lo mete de primero en  las publicaciones
        this.posts.unshift(post);
      })
      .catch((err) => {
        // handle err
      });
  }

  reload(event) {
    this.cd.detectChanges();
    this.getPost(event, true);
    this.gallery.reload();
    this.getCountPost()
  
  }

  getCountPost() {
    this.viewsProfileService
      .getProfileView(this.userService.User._id)
      .pipe(take(1))
      .subscribe((views: any) => {
        if (!views) return false;
        this.views = views.visits;
      });

    const uP = this.userService.User.profile_user;

    if (
      [
        "club",
        "representative",
        "association",
        "foundation",
        "federation",
        "brand",
        "sponsor",
      ].includes(uP)
    )
      this.landingButton = true;
    else this.landingButton = false;

    this.profileService
      .getCountPostByUser(this.userService.User._id)
      .then((count: number) => {
        this.countPost = count;
      })
      .catch((err) => {});
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  goTo(r) {
    this.router.navigate([r]);
  }

  skip = 0;

  getPost(event = null, reload = false) {
    this.loadingPost = true;
    if (reload) {
      this.skip = 0;
      this.posts = [];
    }
    this.postService
      .myPost(this.skip)
      .toPromise()
      .then((posts: IPost[]) => {
        this.posts = this.posts.concat(posts);
        if (event) {
          event.target.complete();
        }
        this.skip += 10;
        this.loadingPost = false;
      })
      .catch((err) => {
        this.loadingPost = false;

        // handler err
      });
  }

  /**
   * Funcion que detecta cuando se bajo el scroll y consulta nuevos datos
   */
  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();
    if (el.clientHeight * 0.4 < el.scrollTop) {
      setTimeout(() => {
        this.reloadButton?.el.classList.add(
          "floating-reload",
          "scale-in-center",
          "btn-green"
        );
      }, 100);
    } else {
      this.reloadButton?.el.classList.remove(
        "scale-in-center",
        "floating-reload",
        "btn-green"
      );
    }

    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingPost
    ) {
      this.getPost();
    }
  }
}
