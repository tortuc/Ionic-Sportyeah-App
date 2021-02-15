import { IComment } from "./../models/iPost";
import { IChallenge } from "./../service/challenge.service";
import { ChallengeReactionsComponent } from "./../components/challenge-reactions/challenge-reactions.component";
import { UserService } from "./../service/user.service";
import { take } from "rxjs/operators";
import { CreateChallengeComponent } from "./../components/challenge/create/create.component";
import { IonContent, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChallengeService } from "../service/challenge.service";
import { ChallengeCommentsComponent } from "../components/challenge-comments/challenge-comments.component";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.page.html",
  styleUrls: ["./challenges.page.scss"],
})
export class ChallengesPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  public challenges: any[] = null;
  public scrolling: boolean = true;
  public challenge: any = null;
  public challengeNumber: number = 0;
  constructor(
    public translate: TranslateService,
    public mc: ModalController,
    public challengeService: ChallengeService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.challengeNumber = 0;
    this.challengeService
      .getAll()
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          this.getUsers(r.challenges);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async getUsers(challenges) {
    const challengesNew: any[] = await Promise.all(
      challenges.map(async (challenge: any) => {
        const r = await this.userService
          .getUserById(challenge.challenged.userId.referenceId)
          .toPromise();
        const r2 = await this.userService
          .getUserById(challenge.challenging.userId.referenceId)
          .toPromise();
        challenge.challenged.userId.data = r;
        challenge.challenging.userId.data = r2;
        return challenge;
      })
    );
    this.challenges = challengesNew.reverse();
    this.challenge = this.challenges[this.challengeNumber];
  }

  async create() {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps: {
        challenged: null,
      },
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    await modal.present();
  }

  async challengeComments(comments: any[]) {
    const modal = await this.createModalComments(comments);
  }

  async createModalComments(comments: any[]) {
    const modal = await this.mc.create({
      component: ChallengeCommentsComponent,
      componentProps: {
        comments,
        referenceId: this.challenge.challenging._id,
        challenge: this.challenge._id,
      },
    });
    await modal.present();
    return modal;
  }

  async challengeReactions() {
    const modal = await this.createModalReactions();
  }

  async createModalReactions() {
    const modal = await this.mc.create({
      component: ChallengeReactionsComponent,
      componentProps: { challenge: this.challenge },
      cssClass: "reactionModal"
    });
    await modal.present();
    return modal;
  }

  async challengeShare() {
    alert("share logic");
  }

  async aceptarReto(challenged) {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps: {
        challenged,
      },
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    await modal.present();
  }

  async onScroll(e) {
    this.challenge = null;
    this.scrolling = false;
    this.challengeNumber += 1;
    this.content.scrollToTop();
    const detail = e.detail;
    if (detail.currentX === 0) {
      if (this.challengeNumber >= this.challenges.length) {
        this.challengeNumber = 0;
        this.ngOnInit();
      }
      setTimeout(() => {
        this.scrolling = true;
        this.content.scrollToTop();
        this.challenge = this.challenges[this.challengeNumber];
      }, 500);
    }
  }
}
