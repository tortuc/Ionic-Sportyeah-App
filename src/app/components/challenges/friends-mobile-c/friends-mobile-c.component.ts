import { take } from "rxjs/operators";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { ViewsProfileService } from "src/app/service/views-profile.service";

@Component({
  selector: "app-friends-mobile-c",
  templateUrl: "./friends-mobile-c.component.html",
  styleUrls: ["./friends-mobile-c.component.scss"],
})
export class FriendsMobileCComponent implements OnInit {
  public users: any[] = null;

  constructor(
    public userService: UserService,
    private router: Router,
    private viewsProfileService: ViewsProfileService
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((r: any) => {
        console.log(this.userService.followings);
        this.users = [];
        // this.userService.followings.map((user: any) =>
        //   this.users.push(user.user)
        // );
        for (let i = 0; i < 10; i++)
          if (r[i])
            this.users.indexOf(r[i]) === -1 &&
            r[i]._id !== this.userService.User._id
              ? this.users.push(r[i])
              : null;
      });
  }

  @Output() new_challenge = new EventEmitter();

  newPost() {
    this.new_challenge.emit(true);
  }

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }

  goToProfile(id, username) {
    if (id == this.userService.User._id) {
      this.router.navigate(["/profile"]);
    } else {
      this.userService.getUserByUsername(username).subscribe((resp: any) => {
        this.viewsProfileService
          .updateProfileView(
            this.userService.User._id,
            resp.user._id,
            "search",
            null
          )
          .subscribe((response) => {
            this.router.navigate([`/user/${username}`]);
          });
      });
    }
  }
}
