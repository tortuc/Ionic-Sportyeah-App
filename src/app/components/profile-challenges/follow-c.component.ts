import { Component, Input, OnInit } from "@angular/core";
import { IChallenge } from "src/app/service/challenge.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector:"follow-btn-c",
  template:`
  <div style="margin-left:16px">
    <ion-button [fill]="buttonFollowState ? 'outline' : 'clear'" 
        style="margin-right: auto; "
      (click)="buttonFollowState === true ? followUser(ownerChallengeId) : unFollowUser(ownerChallengeId)" 
      *ngIf="buttonFollowState !== null"
    >
      {{buttonFollowText | translate}}
      <ion-icon [name]="buttonFollowState ? 'flame-outline' : 'checkmark-circle-outline'" style="margin-left: 5px;"></ion-icon>
    </ion-button>
  </div>
  `,
  styleUrls:['./profile-challenges.component.scss']
})
export class FollowBtnC implements OnInit {
  @Input() Challenge: IChallenge
  buttonFollowState: boolean = null;
  buttonFollowText: string = "follow";
  ownerChallengeId: string = null;
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
    const idOwner = this.Challenge.challenged.userId.data._id;
    this.ownerChallengeId = idOwner;
    const MyId = this.userService.User._id;
    if (idOwner === MyId) {
      this.buttonFollowState = null;
    } else {
      if (this.verifyIdIfFollowing(idOwner)) {
        this.buttonFollowState = false;
        this.buttonFollowText = "unfollow";
      } else {
        this.buttonFollowState = true;
        this.buttonFollowText = "follow";
      }
    }
  }
}