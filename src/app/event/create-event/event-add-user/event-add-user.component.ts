import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Followings, User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "event-add-user",
  templateUrl: "./event-add-user.component.html",
  styleUrls: ["./event-add-user.component.scss"],
})
export class EventAddUserComponent implements OnInit {
  @Input() usersSelect: User[];
  @Input() userSurprise: User;
  constructor(
    public userService: UserService,
    public modalCtrl: ModalController
  ) {}

  segment = "users";

  users: Followings[];
  allUsers: Followings[];

  getUsers() {
    this.allUsers = this.userService.followings;
    this.allUsers = this.allUsers.filter((user) => {
      return user.user._id != this.userSurprise?._id;
    });
    this.filter();
  }

  ngOnInit() {
    this.getUsers();
  }

  filter(event = null) {
    let query = event?.detail.value || "";
    this.users = this.allUsers.filter((user) => {
      query = query.replace(" ", "").toLowerCase();

      let find = user.user.name + user.user.last_name + user.user.username;
      find = find.replace(" ", "").toLowerCase();
      return find.includes(query);
    });
  }

  pushUser(user) {
    let exist = this.usersSelect.find((select) => {
      return select._id == user._id;
    });
    if (!exist) {
      this.usersSelect = this.usersSelect.concat([user]);
    } else {
      this.usersSelect = this.usersSelect.filter((select) => {
        return select._id != user._id;
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      action: "dismiss",
    });
  }
  isSelect(user) {
    let selected = this.usersSelect.find((select) => {
      return select._id == user._id;
    });
    return selected ? "selected" : "";
  }

  addFriends() {
    this.modalCtrl.dismiss({
      action: "add",
      users: this.usersSelect,
    });
  }
}
