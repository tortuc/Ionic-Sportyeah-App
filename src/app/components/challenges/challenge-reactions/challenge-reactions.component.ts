import { UserService } from "./../../../service/user.service";
import { IChallenge } from "./../../../service/challenge.service";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ChallengeService } from "../../../service/challenge.service";
import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";

interface IReactionChallengeIMG {
  src: string;
  level: string;
}

@Component({
  selector: "app-challenge-reactions",
  templateUrl: "./challenge-reactions.component.html",
  styleUrls: ["./challenge-reactions.component.scss"],
})
export class ChallengeReactionsComponent implements OnInit {
  @Input() challenge: IChallenge;
  @ViewChild("circle") circle: ElementRef;
  @ViewChild("reacts") reacts: ElementRef;
  @ViewChild("img") img: ElementRef;
  @ViewChild("like") likee: ElementRef;

  myVote: any = null;
  reactionsNum: number = null;

  public reactions: IReactionChallengeIMG[] = [
    { level: "nivel1", src: "https://img.icons8.com/nolan/64/best-seller.png" },
    {
      level: "nivel2",
      src: "https://img.icons8.com/color/48/000000/super-hero-male.png",
    },
    {
      level: "nivel3",
      src: "https://img.icons8.com/doodle/48/000000/hang-10.png",
    },
    {
      level: "nivel4",
      src: "https://img.icons8.com/color/48/000000/lazy.png",
    },
    {
      level: "nivel5",
      src: "https://img.icons8.com/emoji/48/000000/yawning-face.png",
    },
  ];

  constructor(
    public challengeService: ChallengeService,
    public mc: ModalController,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.challengeService
      .getById(this.challenge._id)
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          const reactions = r.challenge.challenged.reactions;
          this.reactionsNum = reactions.length;
          const r2 = reactions
            .filter(
              (reaction) =>
                reaction.userReference.referenceId === this.userService.User._id
            )
            .reverse()[0];
          if (r2) {
            this.myVote = this.reactions.filter(
              (reaction) => reaction.level === r2.reaction
            )[0];
            this.myVote.level === null ? (this.myVote = null) : null;
          }
        },
        (err) => {}
      );
  }
  time: boolean = false;
  timeOut: any = null;
  timeOutClose: any = null;
  reactionoff() {
    if (!this.time)
      if (this.reacts.nativeElement.classList.contains("show")) {
        this.reacts.nativeElement.style.display = "none";
        this.reacts.nativeElement.classList.remove("show");
      }
  }
  reactionsOFF() {
    setTimeout(() => this.reactionoff(), 1000);
  }
  reactionon() {
    if (!this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.style.display = "flex";
      this.reacts.nativeElement.classList.add("show");
    }
  }
  reactionsON() {
    clearTimeout(this.timeOutClose);
    this.timeOut = setTimeout(() => this.reactionon(), 1000);
    //this.time = true;
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
  like(type: string | null) {
    if (type !== null) {
      const reaction = {
        userReference: {
          appName: "SportYeah",
          referenceId: this.userService.User._id,
        },
        reaction: type,
      };
      this.challengeService
        .createReaction({
          reaction,
          referenceId: this.challenge.challenged._id,
        })
        .pipe(take(1))
        .subscribe((r: any) => {
          this.Close();
          this.ngOnInit();
        });
    } else {
      if(this.myVote){
        this.myVote = null;
        const reaction = {
          userReference: {
            appName: "SportYeah",
            referenceId: this.userService.User._id,
          },
          reaction: type,
        };
        this.challengeService
          .createReaction({
            reaction,
            referenceId: this.challenge.challenged._id,
          })
          .pipe(take(1))
          .subscribe((r: any) => {
            this.Close();
            this.ngOnInit();
          });
      }else{
        type = "nivel3"
        const reaction = {
          userReference: {
            appName: "SportYeah",
            referenceId: this.userService.User._id,
          },
          reaction: type,
        };
        this.myVote = {
          userReference: {
            appName: "SportYeah",
            referenceId: this.userService.User._id,
          },
          reaction: type,
        }
        this.challengeService
          .createReaction({
            reaction,
            referenceId: this.challenge.challenged._id,
          })
          .pipe(take(1))
          .subscribe((r: any) => {
            this.Close();
            this.ngOnInit();
          });
      }
    }
  }
}
