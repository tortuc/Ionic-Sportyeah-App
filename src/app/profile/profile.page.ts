import { SponsorsComponent } from "./sponsors/sponsors.component";
import { LoginService } from "./../service/login.service";
import { take } from "rxjs/operators";
import { BannerLogic } from "./../service/banner-profile-logic.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IPostC } from "../models/iPost";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { ProfileService } from "../service/profile.service";
import { ViewsProfileService } from "../service/views-profile.service";
import { NewsService } from "../service/news.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  public banderaIP: string = null;
  public ipLoaded: Promise<boolean>;
  public profile: boolean = true;
  public postsB: boolean = false;
  public newsB: boolean = false;
  public landingButton: boolean = false;
  loadingPost: boolean;
  countPost = 0;
  constructor(
    public userService: UserService,
    public mc: ModalController,
    public translate: TranslateService,
    public popoverController: PopoverController,
    private postService: PostService,
    private router: Router,
    public profileService: ProfileService,
    public bannerLogic: BannerLogic,
    public loginService: LoginService,
    private viewsProfileService: ViewsProfileService,
    public newsService: NewsService
  ) {
    this.viewsProfileService
      .getProfileView(this.userService.User._id)
      .pipe(take(1))
      .subscribe((views: any) => {
        if (!views) return false;
        this.views = views.visits;
      });
    const uP = this.userService.User.profile_user;
    if (
      uP === "club" ||
      uP === "representative" ||
      uP === "association" ||
      uP === "foundation" ||
      uP === "federation" ||
      uP === "brand" ||
      uP === "sponsor"
    )
      this.landingButton = true;
    else this.landingButton = false;
  }

  news = [];
  posts: IPostC[] = [];
  views: [];
  ngOnInit() {
    this.newsService
      .findUserNews(this.userService.User._id)
      .subscribe((response: any) => {
        this.news = response;
        console.log(response);
      });

    this.loginService.getIP().subscribe((geo) => {
      this.banderaIP = geo.country;
      this.ipLoaded = Promise.resolve(true);
    });
    this.getPost();
    this.getCountPost();
  }

  OpenNews(id) {
    this.newsService.openNews = id;
    this.router.navigate(["news/read"]);
  }
  deleteNew(id) {
    this.newsService.delete(id);
  }
  editNews(idNews) {
    this.newsService.editNews = idNews;
    this.router.navigate(["news/edit"]);
  }
  /* updateNew(){
    this.newsService.updateNews()
  } */

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
      uP === "club" ||
      uP === "representative" ||
      uP === "association" ||
      uP === "foundation" ||
      uP === "federation" ||
      uP === "brand" ||
      uP === "sponsor"
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
      .then((posts: IPostC[]) => {
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

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingPost
    ) {
      this.getPost();
    }
  }

  segmentChanged(e: CustomEvent) {
    if (e.detail.value === "posts") {
      this.profile = false;
      this.newsB = false;
      this.postsB = true;
    } else if (e.detail.value === "profile") {
      this.postsB = false;
      this.newsB = false;
      this.profile = true;
    } else {
      this.newsB = true;
      this.postsB = false;
      this.profile = false;
    }
  }

  public async createSponsor() {
    const modal = await this.mc.create({
      component: SponsorsComponent,
      cssClass: "my-custom-class",
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("SPONSORS DATA FOR CREATE");
      console.log(data);
      const user = this.userService.User;
      user.sponsors.push(data);
      this.userService
        .update(user)
        .pipe(take(1))
        .subscribe((u: any) => {
          console.log(u);
          this.userService
            .getUserByUsername(this.userService.User.username)
            .pipe(take(1))
            .subscribe((u: any) => {
              console.log(u);
              this.userService.User = u.user;
            });
        });
    }
  }

  public deleteSponsor(i: number) {
    const user = this.userService.User;
    user.sponsors.splice(i, 1);
    this.userService
      .update(user)
      .pipe(take(1))
      .subscribe((u: any) => {
        console.log(u);
        this.userService
          .getUserByUsername(this.userService.User.username)
          .pipe(take(1))
          .subscribe((u: any) => {
            console.log(u);
            this.userService.User = u.user;
          });
      });
  }

  public async editSponsor(i: number) {
    console.log("edit");
    const modal = await this.mc.create({
      component: SponsorsComponent,
      cssClass: "my-custom-class",
      componentProps: { data: this.userService.User.sponsors[i] },
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("SPONSORS DATA FOR CREATE");
    console.log(data);
    const user = this.userService.User;
    user.sponsors[i] = data;
    this.userService
      .update(user)
      .pipe(take(1))
      .subscribe((u: any) => {
        console.log(u);
        this.userService
          .getUserByUsername(this.userService.User.username)
          .pipe(take(1))
          .subscribe((u: any) => {
            console.log(u);
            this.userService.User = u.user;
          });
      });
  }
}
