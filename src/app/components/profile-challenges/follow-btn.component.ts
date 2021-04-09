import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector:"follow-btn",
  template:`
  <div>
    <ion-button color="light" [fill]="buttonFollowState ? 'outline' : 'clear'" 
        style="margin-right: auto; "
      (click)="buttonFollowState === true ? followUser(user._id) : unFollowUser(user._id)" 
      *ngIf="buttonFollowState !== null"
    >
      {{buttonFollowText | translate}}
      <ion-icon [name]="buttonFollowState ? 'flame-outline' : 'checkmark-circle-outline'" style="margin-left: 5px;"></ion-icon>
    </ion-button>
  </div>
  `,
  styleUrls:['./profile-challenges.component.scss']
})
export class FollowBtn implements OnInit {
  @Input() user: IUser
  buttonFollowState: boolean = null;
  buttonFollowText: string = "follow";
  constructor(
    public userService: UserService
  ){}
  ngOnInit() {
    this.followButton();
  }
  followUser(id: string) {
    this.userService.follow(id);
    this.buttonFollowState = false;
    this.buttonFollowText = "unfollow";
  }
  unFollowUser(id: string) {
    this.userService.unFollow(id);
    this.buttonFollowState = true;
    this.buttonFollowText = "follow";
  }
  verifyIdIfFollowing(id: string): boolean {
    return this.userService.isFollow(id);
  }
  followButton() {
    const MyId = this.userService.User._id;
    if (this.user._id === MyId) {
      this.buttonFollowState = null;
    } else {
      if (this.verifyIdIfFollowing(this.user._id)) {
        this.buttonFollowState = false;
        this.buttonFollowText = "unfollow";
      } else {
        this.buttonFollowState = true;
        this.buttonFollowText = "follow";
      }
    }
  }
}