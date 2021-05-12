import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-see-profile-banner",
  templateUrl: "./see-profile-banner.component.html",
  styleUrls: ["./see-profile-banner.component.scss"],
})
export class SeeProfileBannerComponent implements OnInit {
  @Input() user: User;
  @Input() photo: string;
  constructor(
    public modalCtrl:ModalController,
    public userService:UserService
  ) {}

  ngOnInit() {}

  visitUser(){
    this.modalCtrl.dismiss()
    this.userService.goToProfile(this.user.username,this.user._id,'profile')
  }
}
