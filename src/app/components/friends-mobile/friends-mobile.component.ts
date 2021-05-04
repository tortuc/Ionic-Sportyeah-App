import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { NewPostPage } from "src/app/dashboard/new-post/new-post.page";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "friends-mobile",
  templateUrl: "./friends-mobile.component.html",
  styleUrls: ["./friends-mobile.component.scss"],
})
export class FriendsMobileComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  @Input() profile: boolean = false;

  open = false;
  async newPost() {
    if (!this.open) {
      this.open = true;
      const modal = await this.modalController.create({
        component: NewPostPage,
        backdropDismiss: false,
      });
      modal.onDidDismiss().then((data) => {
        this.open = false;
        // this.modalClose(data);
      });
      return modal.present();
    }
  }

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }

  goToProfile(username) {
    if (username == this.userService.User.username) {
      this.router.navigate(["/profile"]);
    } else {
      this.router.navigate([`/user/${username}`]);
    }
  }
}
