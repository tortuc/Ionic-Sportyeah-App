import { ModalCreatedComponent } from "./../components/challenges/modal-created/modal-created.component";
import { Subject } from "rxjs";
import { UserService } from "./../service/user.service";
import { take } from "rxjs/operators";
import { CreateChallengeComponent } from "../components/challenges/create/create.component";
import { IonContent, IonInfiniteScroll, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
} from "@angular/core";
import { ChallengeService } from "../service/challenge.service";
import { ChallengeCommentsComponent } from "../components/challenges/challenge-comments/challenge-comments.component";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.page.html",
  styleUrls: ["./challenges.page.scss"],
})
export class ChallengesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild("circle") circle: ElementRef;
  @ViewChild("reacts") reacts: ElementRef;
  @ViewChild("img") img: ElementRef;
  @ViewChild("like") likee: ElementRef;
  @ViewChild(IonContent) content: IonContent;
  // FOR START THE VIDEO IF IS IN SCREEN.
  public scrollEvent: Subject<void> = new Subject();
  // PARA DESTRUIR EL DESAFIO Y NO SE SOBRECARGUE EL SISTEMA.
  public destroy: Subject<void> = new Subject<void>();
  public myVote: any = null;
  public time: boolean = false;
  public challenges: any[] = null;
  public scrolling: boolean = true;
  public challenge: any = null;
  public showc: any[] = [];
  public challengeNumber: number = 0;
  public timeOut: any = null;
  public timeOutClose: any = null;
  public reactionsBool: boolean = false;
  public index: number = 2;
  constructor(
    public translate: TranslateService,
    public mc: ModalController,
    public challengeService: ChallengeService,
    public userService: UserService
  ) {}

  ngOnInit() {}
  init() {
    this.destroy.next();
    this.index = 0;
    this.challengeNumber = 0;
    this.showc = [];
    this.challengeService
      .getAll()
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          this.getUsers(r.challenges);
        },
        (err) => {}
      );
  }

  ionViewWillEnter() {
    this.init();
  }

  reactionoff() {
    this.reactionsBool = false;
    this.time = false;
    this.reacts.nativeElement.classList.remove("show");
  }
  reactionsOFF() {
    setTimeout(() => this.reactionoff(), 1000);
  }
  reactionon() {
    this.reactionsBool = true;
    this.time = true;
    this.reacts.nativeElement.classList.add("show");
  }
  reactionsON() {
    clearTimeout(this.timeOutClose);
    this.timeOut = setTimeout(() => this.reactionon(), 100);
  }
  Close() {
    if (this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.style.display = "none";
      this.reacts.nativeElement.classList.remove("show");
    }
  }

  Changefalse() {
    this.timeOutClose = setTimeout(() => this.reactionoff(), 1000);
    clearTimeout(this.timeOut);
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
    for (let i = 0; i < 1; i++) this.showc.push(this.challenges[i]);
  }

  async create() {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps: {
        challenged: null,
      },
    });
    modal
      .onDidDismiss()
      .then((data) => (data.data?.intentos ? this.modalFinishedCreated() : null));
    await modal.present();
  }

  async modalFinishedCreated() {
    const modal = await this.mc.create({
      component: ModalCreatedComponent,
      cssClass: "a",
      componentProps: {Challenge:this.challenge},
    });
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
    // const modal = await this.mc.create({
    //   component: ChallengeReactionsComponent,
    //   componentProps: { challenge: this.challenge },
    //   cssClass: "reactionModal"
    // });
    // await modal.present();
    // return modal;
  }

  async challengeShare() {
    alert("share logic");
  }

  async onScroll(e) {
    this.myVote = null;
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

  like(type: string, img: string) {
    this.myVote = img;
    const reaction = {
      userReference: {
        appName: "SportYeah",
        referenceId: this.userService.User._id,
      },
      reaction: type,
    };
    this.challengeService
      .createReaction({ reaction, referenceId: this.challenge.challenging._id })
      .pipe(take(1))
      .subscribe((r) => {
        this.reactionoff();
      });
  }

  loadData(e) {
    this.index += 1;
    if (this.challenges[this.index])
      this.showc.push(this.challenges[this.index]);
    this.infiniteScroll.complete();
  }

  ionViewWillLeave() {
    this.destroyVid();
  }

  destroyVid() {
    this.destroy.next();
  }

  sendScrollEvent() {
    this.scrollEvent.next();
  }
}
