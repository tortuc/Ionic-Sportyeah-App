import { Clipboard } from "@angular/cdk/clipboard";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IPost } from "src/app/models/iPost";
import { LoginService } from "src/app/service/login.service";
import { PostService } from "src/app/service/post.service";
import { SocketService } from "src/app/service/socket.service";
import { UserService } from "src/app/service/user.service";
import { Plugins } from "@capacitor/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ShareService } from "src/app/service/share.service";
import { NewPostPage } from "src/app/dashboard/new-post/new-post.page";
import { SharedsPostComponent } from "../shareds-post/shareds-post.component";

const { Share } = Plugins;

@Component({
  selector: "shareds-in-post",
  templateUrl: "./shareds-in-post.component.html",
  styleUrls: ["./shareds-in-post.component.scss"],
})
export class SharedsInPostComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private clipboard: Clipboard,
    private socketService: SocketService,
    private loginService: LoginService,
    private postService: PostService,
    public actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    public userService: UserService,
    private platform: Platform,
    private socialShare: SocialSharing,
    private shareService: ShareService
  ) {}

  /**
   * Cuerpo con los datos del post, reacciones, comentarios y comparticiones
   */
  @Input() post: IPost;

  /**
   * Si se esta cargando desde la pagina del post
   */
  @Input() isPost: boolean = false;

  ngOnInit() {
    this.getTotalShared();
  }

  modalOpen = false;

  totalShared = 0;

  async getTotalShared() {
    this.totalShared = await this.shareService
      .getTotalSharedsInPost(this.post._id)
      .toPromise();
  }

  goToPost(id) {
    if (!this.isPost) {
      this.router.navigate([`/post/${id}`]);
    }
  }

  async seeShareds() {
    if (this.isPost) {
      if (!this.modalOpen) {
        this.modalOpen = true;
        let modal = await this.modalController.create({
          component: SharedsPostComponent,
          componentProps: { post: this.post._id },
        });

        modal.onDidDismiss().then(() => {
          this.modalOpen = false;
        });

        return modal.present();
      }
    } else {
      this.goToPost(this.post._id);
    }
  }

  async shared(post) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("share.header"),
      buttons: [
        {
          text: this.translate.instant("share.now"),
          icon: "arrow-redo-outline",
          handler: async () => {
            if (!this.userService.User) {
              this.loginService.goToLogin(`/post/${post._id}`);
            } else {
              this.shareNow(post);
            }
          },
        },
        {
          text: this.translate.instant("share.with"),
          icon: "arrow-redo-outline",
          handler: async () => {
            if (this.platform.is("mobile")) {
              this.socialShare.share(
                this.translate.instant("share_with.text"),
                this.translate.instant("share_with.title"),
                null,
                `https://app.kecuki.com/post/${post._id}`
              );
            } else {
              this.sharedWeb(post);
            }
          },
        },

        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
          cssClass: "cancel",
        },
      ],
    });
    action.present();
  }

  /**
   * Compartir en el muro de kecuki
   * @param post cuerpo de la publicacion
   * @returns
   */
  async shareNow(post) {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalController.create({
        component: NewPostPage,
        componentProps: { post },
        backdropDismiss: false,
      });
      modal.onDidDismiss().then((data) => {
        this.getTotalShared();

        this.modalOpen = false;
      });
      return await modal.present();
    }
  }

  /**
   * Compartir al exterior, desde la web
   */
  async sharedWeb(post: IPost) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("share.header"),
      buttons: [
        {
          text: "twitter",
          icon: "logo-twitter",
          handler: () => {
            window.open(
              `https://twitter.com/intent/tweet?text=${this.translate.instant(
                "share_with.text"
              )}&url=https://app.kecuki.com/post/${post._id}`,
              "_blank"
            );
            this.socketService.socket.emit("shared", "twitter");
          },
          cssClass: "twitter",
        },
        {
          text: "WhatsApp",
          icon: "logo-whatsapp",
          handler: () => {
            window.open(
              `https://wa.me/?text=${this.translate.instant(
                "share_with.text"
              )} https://app.kecuki.com/post/${post._id}`,
              "_blank"
            );
            this.socketService.socket.emit("shared", "whatsapp");
          },
          cssClass: "whatsapp",
        },
        {
          text: "Facebook",
          icon: "logo-facebook",
          handler: () => {
            window.open(
              ` https://www.facebook.com/sharer/sharer.php?u=https://app.kecuki.com/post/${post._id}`,
              "_blank"
            );
            this.socketService.socket.emit("shared", "facebook");
          },
          cssClass: "facebook",
        },
        {
          text: "LinkedIn",
          icon: "logo-linkedin",

          handler: () => {
            window.open(
              `http://www.linkedin.com/shareArticle?mini=true&url=https://app.kecuki.com/post/${
                post._id
              }&title=${this.translate.instant(
                "share_with.text"
              )}&summary=Kecuki&source=app.kecuki.com`,
              "_blank"
            );
            this.socketService.socket.emit("shared", "linkedin");
          },
          cssClass: "linkedin",
        },
        {
          text: this.translate.instant("copy"),
          icon: "reader",
          handler: () => {
            this.clipboard.copy(
              `${this.translate.instant(
                "share_with.text"
              )} https://app.kecuki.com/post/${post._id}`
            );
            this.socketService.socket.emit("shared", "copy");
          },
          cssClass: "copy",
        },

        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
          cssClass: "cancel",
        },
      ],
    });
    action.present();
  }
}
