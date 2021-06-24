import { Component, Input, OnInit,EventEmitter,Output} from "@angular/core";
import { ModalController,PopoverController,AlertController } from "@ionic/angular";
import { IComment } from "src/app/models/iPost";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { SeeFilesPostSliderComponent } from "../see-files-post-slider/see-files-post-slider.component";
import { OptionsPostPage } from "src/app/profile/options-post/options-post.page";
import { EditCommentPage } from "src/app/profile/edit-comment/edit-comment.page";
import { TranslateService } from "@ngx-translate/core";
import { CommentService } from "src/app/service/comment.service";
@Component({
  selector: "view-comment",
  templateUrl: "./view-comment.component.html",
  styleUrls: ["./view-comment.component.scss"],
})
export class ViewCommentComponent implements OnInit {
  @Input() comment: IComment;

  @Output() comments = new EventEmitter();
  @Output() Deletedcomments = new EventEmitter();
  constructor(
    public userService: UserService,
    private popoverController: PopoverController,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    private commentService: CommentService,
    private alertController: AlertController,
    private modalController: ModalController,
    public viewsSponsorService:ViewsSponsorService
  ) {}

  ngOnInit() {}

  async openImg() {
    let modal = await this.modalCtrl.create({
      component: SeeFilesPostSliderComponent,
      componentProps: { files: this.comment.files },
    });
    modal.present();
  }

  goToSponsor(sponsor) { console.log("desde coment views sponosr");
  
    if (this.comment.user._id != this.userService.User._id) {
      this.viewsSponsorService
        .createSponsorView({
          user: this.comment.user._id,
          visitor: this.userService.User._id,
          from: "comment",
          link: `/post/${this.comment.post}`,
          nameSponsor: sponsor.name,
        })
        .subscribe((response) => {
          window.open("//" + sponsor.url, "_blank");
        });
    } else {
      window.open("//" + sponsor.url, "_blank");
    }
  }

  async openOptions(ev: any) {
    const popover = await this.popoverController.create({
      component: OptionsPostPage,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      componentProps: { post: this.comment },
    });
    popover.onDidDismiss().then((data) => {
      this.options(data.data);
    });
    return await popover.present();
  }

  options(data) {
    switch (data?.action) {
      case "delete":
        this.askDelete(data.post);
        break;
      case "edit":
        this.edit(data.post);
        break;

      default:
        break;
    }
  }

  async askDelete(post: IComment) {
    let alert = await this.alertController.create({
      header: this.translate.instant("delete_post.header"),
      message: this.translate.instant("delete_post.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.deleteComment(post);
          },
        },
      ],
    });
    alert.present();
  }


  deleteComment(posts: IComment) {
    console.log("delete comentario")
    this.commentService
      .deleteOne(posts._id)
      .toPromise()
      .then((post) => {
        this.comment.deleted = true;
        this.Deletedcomments.emit()

        
      })
      .catch((err) => {
        // handle the error
      });
  }


  async edit(comment: any) {
    const modal = await this.modalController.create({
      component: EditCommentPage,
      cssClass: "my-custom-class",
      componentProps: {
        comment,
      },
    });
    modal.onDidDismiss().then((data) => {
      //this.modalClose(data.data);
    });
    return await modal.present();
  }

  


}
