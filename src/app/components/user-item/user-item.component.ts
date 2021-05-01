import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";
import { AnalyticService } from "src/app/service/analytic.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.scss"],
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor(
    public userService: UserService,
    private analyticService: AnalyticService
  ) {}

  ngOnInit() {
    this.getFollows();
  }

  followers = 0;
  followings = 0;

  async getFollows() {
    let data = await this.analyticService
      .getFollowsAnalytic(this.user._id)
      .toPromise();
    if (data) {
      this.followers = data.followers;
      this.followings = data.followings;
    }
  }
}
