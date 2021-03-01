import { UserService } from "./../../../service/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-created",
  templateUrl: "./modal-created.component.html",
  styleUrls: ["./modal-created.component.scss"],
})
export class ModalCreatedComponent implements OnInit {
  challengeLink: string =
    "https://localhost:8100/challenge/abcjiajkasjdufeiwrjqr";
  users: any[] = null;
  name:string = '';

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.followings;
  }

  onChange(search) {
    this.users = this.userService.followings;
    this.users = this.users.filter(
      (user: any) => JSON.stringify(user).indexOf(search) !== -1
    );
  }
}
