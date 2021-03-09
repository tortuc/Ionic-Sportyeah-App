import { User, Followings } from "src/app/service/user.service";
import { UserService } from "./../../../service/user.service";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { ChallengeService } from "./../../../service/challenge.service";
import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IChallenge } from "src/app/service/challenge.service";

interface ResponseChallenges {
  challenges: IChallenge[];
}

@Component({
  selector: "app-parte-derecha-web",
  templateUrl: "./parte-derecha-web.component.html",
  styleUrls: ["./parte-derecha-web.component.scss"],
})
export class ParteDerechaWebComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  next: any = null;

  // si es null no aparece
  // si es false lo sigue
  // si es true no lo sigue
  buttonFollowState: boolean = null;
  buttonFollowText: string = "follow";

  ownerChallengeId: string = null;

  constructor(
    public cs: ChallengeService,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getNext();
    this.followButton();
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

  verifyIdIfFollowing(id: string): boolean {
    return this.userService.isFollow(id);
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

  async getNext() {
    this.next =
      this.Challenge.challenges.length > 0
        ? await this.verifyParent()
        : await this.verifyParent();
  }

  async verifyParent() {
    return this.Challenge.challenged.media === this.Challenge.challenging.media
      ? await this.getRandom()
      : // : await this.getParent();
        await this.getRandom();
  }

  // getParent(): IChallenge {}

  async getRandom(): Promise<any> {
    const r: any = await this.cs.getAll().pipe(take(1)).toPromise();
    return r.challenges[Math.floor(Math.random() * r.challenges.length)];
  }

  getNextChild(): IChallenge {
    return this.Challenge.challenges[0];
  }

  goToProfile(xd, dx) {}

  goNext() {
    this.router.navigate([`/challenge/${this.next._id}`]);
  }
}
