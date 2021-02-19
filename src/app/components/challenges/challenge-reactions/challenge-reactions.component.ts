import { IChallenge } from './../../../service/challenge.service';
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

  myVote: IReactionChallengeIMG = null;

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
    {
      level: "nivel6",
      src: "https://img.icons8.com/emoji/48/000000/lady-beetle.png",
    },
  ];

  constructor(
    public challengeService: ChallengeService,
    public mc: ModalController
  ) {}

  ngOnInit() {
    console.log(this.challenge);
    this.challengeService
      .getById(this.challenge._id)
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          console.log(r);
          console.log(r.challenge.challenging.reactions);
        },
        (err) => console.log(err)
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
}
