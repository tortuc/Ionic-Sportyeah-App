import { Clipboard } from "@angular/cdk/clipboard";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  Platform,
  PopoverController,
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
import { SharePopoverComponent } from "../share-popover/share-popover.component";

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
    private shareService: ShareService,
    private popover: PopoverController
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

  async shared(ev) {
    if (this.platform.is("mobile")) {
      let action = await this.actionSheetCtrl.create({
        header: this.translate.instant("share.header"),
        buttons: [
          {
            text: this.translate.instant("share.now"),
            icon: "bookmark-outline",
            handler: () => {
              this.shareRigthNow();
            },
          },
          {
            text: this.translate.instant("share.wall"),
            icon: "create-outline",
            handler: async () => {
              if (!this.userService.User) {
                this.loginService.goToLogin(`/post/${this.post._id}`);
              } else {
                this.shareNow();
              }
            },
          },
          {
            text: this.translate.instant("share.with"),
            icon: "arrow-redo-outline",
            handler: async () => {
              this.shareWith();
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
    } else {
      this.openPopover(ev);
    }
  }
  shareWith() {
    if (this.platform.is("mobile")) {
      // this.customMobileShare()
      this.socialShare.share(
        this.translate.instant("share_with.text"),
        this.translate.instant("share_with.title"),
        null,
        `https://app.sportyeah.com/post/${this.post._id}`
      );
    } else {
      this.sharedWeb();
    }
  }

  async customMobileShare(){
    this.socialShare.canShareVia("com.instagram.android").then((response)=>{
      console.log("si se puede",response)
    })
    .catch((error)=>{
      console.log("no se puede",error)
    })
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("share.header"),
      buttons: [
        {
          text: "twitter",
          icon: "logo-twitter",
          handler: () => {
            this.socialShare.shareViaTwitter(this.translate.instant(
              "share_with.text"
            ),null,`https://app.sportyeah.com/post/${this.post._id}`)
           
            this.socketService.socket.emit("shared", "twitter");
          },
          cssClass: "twitter",
        },
        {
          text: "tiktok",
          icon: "logo-tiktok",
          handler: () => {
            this.socialShare.shareVia("com.zhiliaoapp.musically",this.translate.instant(
              "share_with.text"
            ),null,`https://app.sportyeah.com/post/${this.post._id}`)
           
            this.socketService.socket.emit("shared", "twitter");
          },
          cssClass: "tiktok",
        },
        {
          text: "WhatsApp",
          icon: "logo-whatsapp",
          handler: () => {
            this.socialShare.shareViaWhatsApp(this.translate.instant(
              "share_with.text"
            ),null,`https://app.sportyeah.com/post/${this.post._id}`)
           
            this.socketService.socket.emit("shared", "whatsapp");
          },
          cssClass: "whatsapp",
        },
        {
          text: "Instagram",
          icon: "logo-instagram",
          handler: () => {
            this.socialShare.shareViaInstagram(this.translate.instant(
              "share_with.text"
            ) + `https://app.sportyeah.com/post/${this.post._id}`,null)
            this.socketService.socket.emit("shared", "facebook");
          },
          cssClass: "instagram",
        },
        {
          text: "Facebook",
          icon: "logo-facebook",
          handler: () => {
            this.socialShare.shareViaFacebook(this.translate.instant(
              "share_with.text"
            ),null,`https://app.sportyeah.com/post/${this.post._id}`)
            this.socketService.socket.emit("shared", "facebook");
          },
          cssClass: "facebook",
        },
        {
          text: "LinkedIn",
          icon: "logo-linkedin",

          handler: () => {
            
            this.socialShare.shareVia("com.linkedin.android",this.translate.instant(
              "share_with.text"
            ),null,`https://app.sportyeah.com/post/${this.post._id}`).catch((error)=>{
              console.log(error)
            })
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
              )} https://app.sportyeah.com/post/${this.post._id}`
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

  async openPopover(ev) {
    let popover = await this.popover.create({
      component: SharePopoverComponent,
      event: ev,
      showBackdrop: false,
    });
    popover.onDidDismiss().then((response) => {
      switch (response.data) {
        case "now":
          this.shareRigthNow();
          break;
        case "wall":
          this.shareNow();
          break;
        case "with":
          this.shareWith();
        default:
          break;
      }
    });
    popover.present();
  }

  shareRigthNow() {
    let post = {
      user: this.userService.User._id,
      post: this.post.post ? this.post.post._id : this.post._id,
    };
    this.postService
      .create(post)
      .toPromise()
      .then((post: IPost) => {
        this.postService.newPost(post._id);
      })
      .catch((err) => {});
  }

  /**
   * Compartir en el muro de sportyeah
   * @param post cuerpo de la publicacion
   * @returns
   */
  async shareNow() {
    let  post =  this.post.post ? this.post.post : this.post
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
  async sharedWeb() {
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
              )}&url=https://app.sportyeah.com/post/${this.post._id}`,
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
              )} https://app.sportyeah.com/post/${this.post._id}`,
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
              ` https://www.facebook.com/sharer/sharer.php?u=https://app.sportyeah.com/post/${this.post._id}`,
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
              `http://www.linkedin.com/shareArticle?mini=true&url=https://app.sportyeah.com/post/${
                this.post._id
              }&title=${this.translate.instant(
                "share_with.text"
              )}&summary=sportyeah&source=app.sportyeah.com`,
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
              )} https://app.sportyeah.com/post/${this.post._id}`
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
