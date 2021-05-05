import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "user-in-group-item",
  templateUrl: "./user-in-group-item.component.html",
  styleUrls: ["./user-in-group-item.component.scss"],
})
export class UserInGroupItemComponent implements OnInit {
  @Input() user: User;
  @Input() admins: any[];

  constructor(public userService: UserService) {}

  ngOnInit() {}
}
