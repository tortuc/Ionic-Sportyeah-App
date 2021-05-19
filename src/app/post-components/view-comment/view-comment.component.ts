import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IComment } from "src/app/models/iPost";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { SeeFilesPostSliderComponent } from "../see-files-post-slider/see-files-post-slider.component";

@Component({
  selector: "view-comment",
  templateUrl: "./view-comment.component.html",
  styleUrls: ["./view-comment.component.scss"],
})
export class ViewCommentComponent implements OnInit {
  @Input() comment: IComment;

  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public viewsSponsorService:ViewsSponsorService
  ) {}

  ngOnInit() {
  }

  async openImg() {
    let modal = await this.modalCtrl.create({
      component: SeeFilesPostSliderComponent,
      componentProps: { files: this.comment.files },
    });
    modal.present();
  }

  goToSponsor(sponsor) {
  
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
}
