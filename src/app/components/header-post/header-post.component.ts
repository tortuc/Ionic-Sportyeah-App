import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IPost } from "src/app/models/iPost";
import { EditPostPage } from "src/app/profile/edit-post/edit-post.page";
import { OptionsPostPage } from "src/app/profile/options-post/options-post.page";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { ViewsProfileService } from "src/app/service/views-profile.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";

@Component({
  selector: "header-post",
  templateUrl: "./header-post.component.html",
  styleUrls: ["./header-post.component.scss"],
})
export class HeaderPostComponent implements OnInit {
  @Input() post: IPost;

  @Output() getPost = new EventEmitter();

  @Input() displayOptions: boolean = true;

  @Output() edited = new EventEmitter();

  @Input() views: string;

  constructor(
    public userService: UserService,
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private alertController: AlertController,
    private postService: PostService,
    private viewsProfileService: ViewsProfileService,
    private viewsSponsorService: ViewsSponsorService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  goToProfile(id, username, post_id) {
    if (id == this.userService.User._id) {
      this.router.navigate(["/profile"]);
    } else {
      this.userService.getUserByUsername(username).subscribe((resp: any) => {
        this.viewsProfileService
          .createProfileView({
            user: resp.user._id,
            visitor: this.userService.User._id,
            from: "post",
            link: `/post/${post_id}`,
          })
          .subscribe((response) => {
            this.router.navigate([`/user/${username}`]);
          });
      });
    }
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  goToSponsor(sponsor, id, post_id) {
    if (id != this.userService.User._id) {
      this.viewsSponsorService
        .createSponsorView({
          user: id,
          visitor: this.userService.User._id,
          from: "post",
          link: `/post/${post_id}`,
          urlSponsor: sponsor,
        })
        .subscribe((response) => {
          window.open("//" + sponsor, "_blank");
        });
    } else {
      window.open("//" + sponsor, "_blank");
    }
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
  async edit(post: any) {
    const modal = await this.modalController.create({
      component: EditPostPage,
      cssClass: "my-custom-class",
      componentProps: {
        post,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.modalClose(data.data);
    });
    return await modal.present();
  }

  async askDelete(post: IPost) {
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
            this.deletePost(post);
          },
        },
      ],
    });
    alert.present();
  }

  deletePost(post: IPost) {
    this.postService
      .deleteOne(post._id)
      .toPromise()
      .then((post) => {
        this.edited.emit();
      })
      .catch((err) => {
        // handle the error
      });
  }

  async openOptions(ev: any) {
    const popover = await this.popoverController.create({
      component: OptionsPostPage,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      componentProps: { post: this.post },
    });
    popover.onDidDismiss().then((data) => {
      this.options(data.data);
    });
    return await popover.present();
  }

  modalClose(data) {
    if (data.edited) {
      this.edited.emit();
    }
  }
}
