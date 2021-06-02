import { Clipboard } from "@angular/cdk/clipboard";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  Platform,
  PopoverController,
  ToastController,
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
import { SharePopoverComponent } from "src/app/post-components/share-popover/share-popover.component";
import { SharedsPostComponent } from "src/app/post-components/shareds-post/shareds-post.component";

@Component({
  selector: 'shareds-in-news',
  templateUrl: './shareds-in-news.component.html',
  styleUrls: ['./shareds-in-news.component.scss'],
})
export class SharedsInNewsComponent implements OnInit {

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
    private popover: PopoverController,
    public toastController: ToastController,
  ) { }

  
  /**
   * Cuerpo con los datos del news, reacciones, comentarios y comparticiones
   */
   @Input() news

   /**
    * Si se esta cargando desde la pagina del news
    */
   @Input() isNews: boolean = false;
 
   ngOnInit() {
     this.getTotalShared();
   }
 
   async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.translate.instant("news.news_shared"),
      position: "bottom",
      color: "dark",
      duration: 3000,
    });
    toast.present();
  }

   modalOpen = false;
 
   totalShared = 0;
 
   async getTotalShared() {
     this.totalShared = await this.shareService
       .getTotalSharedsInNews(this.news._id)
       .toPromise();
   }
 
   goToNews(id) {
     if (!this.isNews) {
       this.router.navigate([`/news/read/${id}`]);
     }
   }
 
   async seeShareds() {
     if (this.isNews) {
       if (!this.modalOpen) {
         this.modalOpen = true;
         let modal = await this.modalController.create({
           component: SharedsPostComponent,
           componentProps: { post: this.news._id },
         });
 
         modal.onDidDismiss().then(() => {
           this.modalOpen = false;
         });
 
         return modal.present();
       }
     } else {
       this.goToNews(this.news._id);
     }
   }
 
   async shared(ev) {
     if (this.platform.is("mobile")) {
       let action = await this.actionSheetCtrl.create({
         header: this.translate.instant("share.header"),
         buttons: [
           {
             text: this.translate.instant("share.now"),
             icon: "arrow-redo-outline",
             handler: () => {
               this.shareRigthNow();
             },
           },
           {
             text: this.translate.instant("share.wall"),
             icon: "create-outline",
             handler: async () => {
               if (!this.userService.User) {
                 this.loginService.goToLogin(`/news/read/${this.news._id}`);
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
       this.socialShare.share(
         this.translate.instant("share_with.text-news"),
         this.translate.instant("share_with.title"),
         null,
         `https://app.sportyeah.com/news/read/${this.news._id}`
       );
       this.getTotalShared()
       this.presentToastWithOptions()
     } else {
       this.sharedWeb();
     }
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
       news: this.news._id
     };
     this.postService
       .create(post)
       .toPromise()
       .then((post: IPost) => {
         this.postService.newPost(post._id);
         this.getTotalShared()
         this.presentToastWithOptions()
       })
       .catch((err) => {});
   }
 
   /**
    * Compartir en el muro de sportyeah
    * @param post cuerpo de la publicacion
    * @returns
    */
   async shareNow() {
     let  news =  this.news.post ? this.news.post : this.news
     if (!this.modalOpen) {
       this.modalOpen = true;
       const modal = await this.modalController.create({
         component: NewPostPage,
         componentProps: { news },
         backdropDismiss: false,
       });
       modal.onDidDismiss().then((data) => {
         this.modalOpen = false;
         this.getTotalShared()
         this.presentToastWithOptions()
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
                 "share_with.text-news"
               )}&url=https://app.sportyeah.com/news/read/${this.news._id}`,
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
                 "share_with.text-news"
               )} https://app.sportyeah.com/news/read/${this.news._id}`,
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
               ` https://www.facebook.com/sharer/sharer.php?u=https://app.sportyeah.com/news/read/${this.news._id}`,
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
               `http://www.linkedin.com/shareArticle?mini=true&url=https://app.sportyeah.com/news/read/${this.news._id}&title=${this.translate.instant(
                 "share_with.text-news"
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
                 "share_with.text-news"
               )} https://app.sportyeah.com/news/read/${this.news._id}`
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
