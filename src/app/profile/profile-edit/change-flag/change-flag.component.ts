import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "change-flag",
  templateUrl: "./change-flag.component.html",
  styleUrls: ["./change-flag.component.scss"],
})
export class ChangeFlagComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {}

  change(flag) {
    this.userService.update({ flag }).subscribe((user:User) => {
      this.userService.User = user;
    });
  }
}
