import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  IonContent,
  ModalController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LangsPage } from "../langs/langs.page";
import { IPost, IPostC } from "../models/iPost";
import { LoginService } from "../service/login.service";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { AddFriendsPage } from "./add-friends/add-friends.page";
import { NewPostPage } from "./new-post/new-post.page";
import { JdvimageService } from "../service/jdvimage.service";
import { ReusableComponentsIonic } from "../service/ionicHelpers.service";
import { take } from "rxjs/operators";

interface Connection {
  user: Object;
  ip: String;
  country: String;
  city: String;
  date: Date;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit, AfterViewInit {
  public loadingPost: boolean;
  constructor(
    public toastController: ToastController,
    public translate: TranslateService,
    public userService: UserService,
    public modalController: ModalController,
    public postService: PostService,
    private loginService: LoginService,
    private popover: PopoverController,
    private router: Router,
    private alertCtrl: AlertController,
    public el: ElementRef,
    public reusableCI: ReusableComponentsIonic
  ) {}

  @ViewChild("content", { static: false }) content: IonContent;

  ngAfterViewInit() {}

  ngOnInit() {}

  newsStream;
  isScrolledIntoView() {
    const rect = this.newsStream.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;

    if (topShown && bottomShown) {
      /* this.subscribe() */
    } else {
      /* this.unSubscribe() */
    }
  }

  skipPost = 0;

  ionViewWillEnter() {
    this.getPost();
  }

  all: boolean;

  daysBefore = 7;

  posts: IPost[] = [];

  getPost(event = null, newPosts = false) {
    if (newPosts) {
      this.skipPost = 0;
      this.posts = [];
      this.all = false;
      this.scrollTop();
    }
    if (!this.all) {
      this.loadingPost = true;
      this.postService
        .friendsPosts({
          friends_id: this.userService.followings,
          skip: this.skipPost,
          days: this.daysBefore,
        })
        .pipe(take(1))
        .subscribe(
          (posts: IPost[]) => {
            this.posts = this.posts.concat(posts);
            this.skipPost += 10;
            if (event) {
              event.target.complete();
            }
            if (posts.length < 10) {
              this.skipPost -= 10 - posts.length;

              // si encontro menos de 10 posts entonces evaluamos si hay mas de 100 posts y entonces no seguimos buscando
              // o tambien si los dias de busqueda ya son 21 dias, entonces tampoco seguiremos buscando asi no hayan 100 posts
              // pero mientras siga buscando de 10 en 10 y los dias no son mas de 21 puede encontrar miles de posts si es posible
              if (this.posts.length > 100 || this.daysBefore == 21) {
                // marcamos que ya encontro todos los posts, y no se sigue buscando
                this.all = true;
              } else if (this.daysBefore < 21) {
                // pero si aun no hay mas de 100 post, entonces se le suma 7 dias a la busqueda para poder llegar a los 100 posts
                this.daysBefore += 7;
                // volvermos a buscar mas posts
                this.getPost();
              }
            }
            this.loadingPost = false;
          },
          (err) => {
            this.loadingPost = false;

            // handle error
          }
        );
    }
  }

  scrollTop() {
    this.content.scrollToTop();
  }

  async showAlert(header, message) {
    let alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{ text: this.translate.instant("okey") }],
    });
    alert.present();
  }

  newPost(post) {
    this.postService
      .getPost(post._id)
      .toPromise()
      .then((post: IPost) => {
        this.posts.unshift(post);
      })
      .catch((err) => {
        // handle err
      });
  }

  goToProfile(id, username) {
    if (id == this.userService.User._id) {
      this.router.navigate(["/profile"]);
    } else {
      this.router.navigate([`/user/${username}`]);
    }
  }

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewPostPage,
      cssClass: "my-custom-class",
      backdropDismiss: false,
    });

    return await modal.present();
  }

  async searchFriend() {
    let modal = await this.modalController.create({
      component: AddFriendsPage,
      cssClass: "my-custom-class",
    });

    return await modal.present();
  }

  async langs(ev) {
    let langs = await this.popover.create({
      component: LangsPage,
      translucent: true,
      event: ev,
    });

    langs.present();
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingPost
    ) {
      this.getPost();
    }
  }

  
}
