import { environment } from "src/environments/environment";
import { IChallenge } from "./../../../service/challenge.service";
import { UserService } from "./../../../service/user.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-created",
  templateUrl: "./modal-created.component.html",
  styleUrls: ["./modal-created.component.scss"],
})
export class ModalCreatedComponent implements OnInit {
  @Input() Challenge: IChallenge;
  challengeLink: string =
    "https://localhost:8100/challenge/abcjiajkasjdufeiwrjqr";
  users: any[] = null;
  name: string = "";

  constructor(public userService: UserService) {}

  ngOnInit() {
    console.log(this.Challenge);
    this.users = this.userService.followings;
    this.challengeLink = `${environment.URL_FRONT}challenge/${this.Challenge._id}`;
  }

  onChange(search) {
    this.users = this.userService.followings;
    this.users = this.users.filter(
      (user: any) => JSON.stringify(user).indexOf(search) !== -1
    );
  }
}
