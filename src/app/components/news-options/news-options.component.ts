import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  ToastController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { NewPostPage } from "src/app/dashboard/new-post/new-post.page";
import { ILike, IPost, IPostC, INewC, INew } from "src/app/models/iPost";
import { NewCommentComponent } from "src/app/post/new-comment/new-comment.component";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { Plugins } from "@capacitor/core";
import { Clipboard } from "@angular/cdk/clipboard";
import { LikesPostComponent } from "../likes-post/likes-post.component";
import { SharedsPostComponent } from "../shareds-post/shareds-post.component";
import { ReactionsPostsComponent } from "../reactions-posts/reactions-posts.component";
import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { NewsService } from "src/app/service/news.service";
const { Share } = Plugins;

@Component({
  selector: 'news-options',
  templateUrl: './news-options.component.html',
  styleUrls: ['./news-options.component.scss'],
})
export class NewsOptionsComponent implements OnInit {
  @ViewChild("circle") circle: ElementRef;
  @ViewChild("reacts") reacts: ElementRef;
  @ViewChild("img") img: ElementRef;
  @ViewChild("like") likee: ElementRef;
  @Input() news: INewC;
  constructor(
    public userService: UserService,
    private postService: PostService,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    public translate: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    private clipboard: Clipboard,
    private popoverController: PopoverController,
    public newsService: NewsService,

  ) {
    
   }

  ngOnInit() {
     // verifica que no si hay o no item
     let actualReaction: any = this.news.likes.find((news) => {
      return news.user._id == this.userService.User._id;
    });
    if (actualReaction) {
      this.rea = actualReaction.type;
    } else {
      this.rea = null;
    }
  }

rea
  time: boolean = false;
  timeOut: any = null;
  timeOutClose: any = null;
  reactionoff() {
    if (!this.time)
      if (this.reacts.nativeElement.classList.contains("show")) {
        this.reacts.nativeElement.style.display = "none";
        this.reacts.nativeElement.classList.remove("show");
      }
  }
  reactionsOFF() {
    setTimeout(() => this.reactionoff(), 1000);
  }
  reactionon() {
    if (!this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.style.display = "flex";
      this.reacts.nativeElement.classList.add("show");
    }
  }
  reactionsON() {
    clearTimeout(this.timeOutClose);
    this.timeOut = setTimeout(() => this.reactionon(), 1000);
    //this.time = true;
  }
  Close() {
    if (this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.style.display = "none";
      this.reacts.nativeElement.classList.remove("show");
    }
  }

  Changefalse() {
    //this.time = false;
    //this.reactionsOFF();
    this.timeOutClose = setTimeout(() => this.reactionoff(), 1000);
    clearTimeout(this.timeOut);
  }


  like2(id, likes, reaction, only = false) {
    this.Close();
    let liked = likes.find((item) => {
      return (
        item.user._id == this.userService.User._id && item.type == reaction
      );
    });
    if (only) {
      liked = likes.find((item) => {
        return item.user._id == this.userService.User._id;
      });
    }
    let liked2 = likes.find((item) => {
      return item.user._id == this.userService.User._id;
    });

    if (liked) {
      this.dislike2(liked._id);
    } else {
      if (liked2) this.dislike2(liked2._id);
      this.newsService
        .likeNews(id, reaction)
        .toPromise() ///funciona?
        .then((likes: ILike[]) => {
          this.news.likes = likes;
          this.rea = reaction;
        })
        .catch((err) => {
          // handle err
        });
    }
  }

  dislike2(like) {
    this.newsService
      .dislikePost(like)
      .toPromise() ///CAmbiar
      .then((likes: ILike[]) => {
        this.news.likes = likes;
      })
      .catch((err) => {
        //handle err
      });
  }
  async seeLikes() {
   
      let reaction1 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 1;
      });
      let reaction2 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 2;
      });
      let reaction3 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 3;
      });
      let reaction4 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 4;
      });
      let reaction5 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 5;
      });
      let reaction6 = this.news.likes.filter((reactions: any) => {
        return reactions.type == 6;
      });

      let modal = await this.modalController.create({
        component: LikesPostComponent,
        componentProps: {
          likes: this.news.likes,
          likE: reaction1,
          love: reaction2,
          haha: reaction3,
          wow: reaction4,
          sad: reaction5,
          angry: reaction6,
          idPost: null,
          idNews: this.news.news._id,
        },
      });
      return modal.present();
    
  }

  async comment2(news) {
    let comment = await this.modalController.create({
      component: NewCommentComponent,
      componentProps: { news },
      backdropDismiss: false,
    });
    comment.onDidDismiss().then((data) => {
      this.commentDismiss2(data.data);
    });
    return comment.present();
  }
  async commentDismiss2(data: any) {
    const toast = await this.toastController.create({
      message: this.translate.instant("new_comment_success"),
      duration: 1500,
    });
    if (data.action) {
      switch (data.action) {
        case "comment":
          this.news.comments = data.comments;
          this.newsService.commentAudio(); ///Funciona?
          toast.present();
          break;

        default:
          break;
      }
    }
  }
  async seeShareds() {
    
    let newsShareds;
  
     newsShareds = this.news.shareds
   

    let modal = await this.modalController.create({
      component: SharedsPostComponent,
      componentProps: { 
        sharedsNews: newsShareds
       },
    });

    return modal.present();
  }
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
              )}&url=https://app.sportyeah.com%2F%23%2Fpost/${post._id}`,
              "_blank"
            );
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
              )} https://app.sportyeah.com%2F%23%2Fpost/${post._id}`,
              "_blank"
            );
          },
          cssClass: "whatsapp",
        },
        {
          text: "Facebook",
          icon: "logo-facebook",
          handler: () => {
            window.open(
              ` https://www.facebook.com/sharer/sharer.php?u=https://app.sportyeah.com%2F%23%2Fpost/${post._id}`,
              "_blank"
            );
          },
          cssClass: "facebook",
        },
        {
          text: "LinkedIn",
          icon: "logo-linkedin",

          handler: () => {
            window.open(
              `http://www.linkedin.com/shareArticle?mini=true&url=https://app.sportyeah.com%2F%23%2Fpost/${
                post._id
              }&title=${this.translate.instant(
                "share_with.text"
              )}&summary=sportyeah&source=app.sportyeah.com`,
              "_blank"
            );
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
              )} https://app.sportyeah.com%2F%23%2Fpost/${post._id}`
            );
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

  async shared2(news) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("share.header"),
      buttons: [
        {
          text: this.translate.instant("share.now"),
          icon: "arrow-redo-outline",
          handler: async () => {
            const modal = await this.modalController.create({
              component: NewPostPage, //revisar / debes editar el post shared que ese es el que recibe el post
              //de paso este recibe el post y se lo manda al post shared
              componentProps: { news },
              backdropDismiss: false,
            });
            modal.onDidDismiss().then((data) => {
              this.modalClose2(data);
            });
            return await modal.present();
          },
        },
        {
          text: this.translate.instant("share.with"),
          icon: "arrow-redo-outline",
          handler: async () => {
            // this.takePicture(CameraSource.Camera)
            try {
              let shareRet = await Share.share({
                title: this.translate.instant("share_with.title"),
                text: this.translate.instant("share_with.text"),
                url: `https://app.sportyeah.com/#/news/${news._id}`, //Debes de agregar el id de la noticia
                dialogTitle: this.translate.instant("share_with.dialogTitle"), // al link
              });
            } catch (error) {
              this.sharedWeb(news);
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

  async sharedWeb2(news: INew) {
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
              )}&url=https://app.sportyeah.com%2F%23%2Fnews/${news._id}`,
              "_blank"
            );
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
              )} https://app.sportyeah.com%2F%23%2Fnews/${news._id}`,
              "_blank"
            );
          },
          cssClass: "whatsapp",
        },
        {
          text: "Facebook",
          icon: "logo-facebook",
          handler: () => {
            window.open(
              ` https://www.facebook.com/sharer/sharer.php?u=https://app.sportyeah.com%2F%23%2Fnews/${news._id}`,
              "_blank"
            );
          },
          cssClass: "facebook",
        },
        {
          text: "LinkedIn",
          icon: "logo-linkedin",

          handler: () => {
            window.open(
              `http://www.linkedin.com/shareArticle?mini=true&url=https://app.sportyeah.com%2F%23%2Fnews/${
                news._id
              }&title=${this.translate.instant(
                "share_with.text"
              )}&summary=sportyeah&source=app.sportyeah.com`,
              "_blank"
            );
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
              )} https://app.sportyeah.com%2F%23%2Fnews/${news._id}`
            );
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
  @Output() sharedEvent = new EventEmitter();

  modalClose2(data) {
    if (data.data?.create) {
      this.sharedEvent.emit(true);

      this.newsService
        .getShareds(this.news.news._id)
        .toPromise()
        .then((shareds: INew[]) => {
          this.news.shareds = shareds;
        })
        .catch((err) => {
          // handle err
        });
      this.newsService.commentAudio();
    }
  }

  
  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

}
