import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "custom-sponsor",
  templateUrl: "./custom-sponsor.component.html",
  styleUrls: ["./custom-sponsor.component.scss"],
})
export class CustomSponsorComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {
    console.log(this.userService.User.sponsor_info);
    if (!this.userService.User.sponsor_info) {
      let sponsor_info = {
        name: "SportYeah",
        miniature: "assets/sponsors/default_mini.jpg",
        profile_image: "assets/sponsors/default_profile.jpg",
      };
      this.userService.update({ sponsor_info }).subscribe((user) => {
        this.userService.User = user;
      });
    }
  }
}
