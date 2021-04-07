import { UserService } from "src/app/service/user.service";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { ChallengeService, IChallenge } from "./../service/challenge.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-challenge",
  templateUrl: "./challenge.page.html",
  styleUrls: ["./challenge.page.scss"],
})
export class ChallengePage implements OnInit {
  // Challenging
  user: string = null;

  challenge: IChallenge = null;

  // For destroy video
  destroy: Subject<void> = new Subject<void>();

  // For pause the video
  pause: Subject<void> = new Subject<void>();

  // For scroll event
  scroll: Subject<void> = new Subject<void>();

  constructor(
    public activeRouter: ActivatedRoute,
    public userService: UserService,
    public cs: ChallengeService
  ) {}

  getchallenge() {
    this.cs
      .getById(this.activeRouter.snapshot.params.id)
      .pipe(take(1))
      .subscribe(async (r: any) => {
        this.challenge = await this.getUserChallenge(r.challenge);
      });
  }

  async getUserChallenge(challenge: IChallenge): Promise<IChallenge> {
    const r = await this.userService
      .getUserById(challenge.challenged.userId.referenceId)
      .toPromise();
    const r2 = await this.userService
      .getUserById(challenge.challenging.userId.referenceId)
      .toPromise();
    challenge.challenged.userId.data = r;
    challenge.challenging.userId.data = r2;
    return challenge;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getchallenge();
    this.user = this.activeRouter.snapshot.params.username;
    this.user ? this.getChallenging() : null;
  }

  getChallenging() {
    this.userService
      .getUserByUsername(this.user)
      .pipe(take(1))
      .subscribe((r: any) => {
      });
  }
  ionViewWillLeave() {
    this.destroy.next();
  }
}
