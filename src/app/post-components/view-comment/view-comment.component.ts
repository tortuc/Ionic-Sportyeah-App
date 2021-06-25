import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import {
  ModalController,
  PopoverController,
  AlertController,
} from "@ionic/angular";
import { IComment } from "src/app/models/iPost";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { SeeFilesPostSliderComponent } from "../see-files-post-slider/see-files-post-slider.component";
import { OptionsPostPage } from "src/app/profile/options-post/options-post.page";
import { EditCommentPage } from "src/app/profile/edit-comment/edit-comment.page";
import { TranslateService } from "@ngx-translate/core";
import { CommentService } from "src/app/service/comment.service";
import { PopoverOptionsComponent } from "src/app/components/structure/popover-options/popover-options.component";

enum Texts {
  edit = "Editar comentario",
  delete = "Eliminar comentario",
}

enum options {
  edit = "edit",
  delete = "delete",
}

const popoverOtions = [
  {
    icon: "create-outline",
    text: Texts.edit,
    action: "edit",
  },
  {
    icon: "trash-bin-outline",
    text: Texts.delete,
    action: "delete",
  },
];
@Component({
  selector: "view-comment",
  templateUrl: "./view-comment.component.html",
  styleUrls: ["./view-comment.component.scss"],
})
export class ViewCommentComponent implements OnInit {
  @Input() comment: IComment;
  @Input() preview: boolean = false;

  @Output() comments = new EventEmitter();
  @Output() Deletedcomments = new EventEmitter();
  countComments: number = 0;
  constructor(
    public userService: UserService,
    private popoverController: PopoverController,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    private commentService: CommentService,
    private alertController: AlertController,
    private modalController: ModalController,
    public viewsSponsorService: ViewsSponsorService
  ) {}

  ngOnInit() {
    this.getCountComments()
  }

  async getCountComments() {
    this.countComments = await this.commentService
      .getCountsOfCommentsInComment(this.comment._id)
      .toPromise();
  }

  async openImg() {
    let modal = await this.modalCtrl.create({
      component: SeeFilesPostSliderComponent,
      componentProps: { files: this.comment.files },
    });
    modal.present();
  }

  goToSponsor(sponsor) {
    console.log("desde coment views sponosr");

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

  async openOptions(event) {
    const popover = await this.popoverController.create({
      component: PopoverOptionsComponent,
      componentProps: { options: popoverOtions },
      event,
      showBackdrop: false,
    });

    popover.onDidDismiss().then((response) => {
      let option = response.data;
      this.handlerOptions(option);
    });
    popover.present();
  }
  handlerOptions(option: options) {
    switch (option) {
      case options.edit:
        this.edit();
        break;

      case options.delete:
        this.askDelete();
        break;

      default:
        break;
    }
  }

  async askDelete() {
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
            this.deleteComment();
          },
        },
      ],
    });
    alert.present();
  }

  deleteComment() {
    console.log("delete comentario");
    this.commentService
      .deleteOne(this.comment._id)
      .toPromise()
      .then(() => {
        this.comment.deleted = true;
        this.Deletedcomments.emit();
      })
      .catch((err) => {
        // handle the error
      });
  }

  async edit() {
    this.commentService.commentEditd$.subscribe((comment)=>{
      console.log(comment)
      if(comment._id == this.comment._id){
        this.comment = comment
      }
    })
    const modal = await this.modalController.create({
      component: EditCommentPage,
      cssClass: "my-custom-class",
      componentProps: {
        comment: this.comment,
      },
    });
    modal.onDidDismiss().then((data) => {
      if(data.data?.edited){
        this.comment = data.data.comment
      }
    });
    return await modal.present();
  }
}
