import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import { IChallenge } from "./../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-challenge-content",
  templateUrl: "./challenge-content.component.html",
  styleUrls: ["./challenge-content.component.scss"],
})
export class ChallengeContentComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  public pauseVideo: boolean = false;
  public n: number = Math.random();
  public video = null;
  public src = null;
  public video2 = null;
  public src2 = null;
  public oneVideo: boolean = null;
  public Mostrar: boolean = true;
  public intervalID: any = null;
  public paused: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log("ON INIT");
    this.subscribeDestroy();
    if (
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      ) !== null ||
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge.challenged._id + this.n
      ) !== null
    ) {
      this.Challenge.challenging.media === this.Challenge.challenged.media
        ? this.initOneVideo()
        : this.initTwoVideos();
      this.pauseS.subscribe(() => {
        this.video.pause();
        this.pauseVideo = true;
      });
      this.scrollEvent.subscribe(() => {
        this.isScrolledIntoView();
      });
    } else setTimeout(() => this.ngOnInit(), 1500);
  }

  initOneVideo() {
    this.video = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      )
    );
    this.src = <HTMLSourceElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      )
    );
    this.video.load();
    this.video.pause();
    this.paused = true;
    this.oneVideo = true;
    this.isScrolledIntoView();
  }

  initTwoVideos() {
    this.video = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge.challenged._id + this.n
      )
    );
    this.src = <HTMLSourceElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge.challenged._id + this.n
      )
    );
    this.video.load();
    this.video.pause();
    this.paused = true;
    this.isScrolledIntoView();
  }
  subscribeDestroy() {
    this.destroy.pipe(take(1)).subscribe(() => {
      this.oneVideo ? this.destroyOneVideo() : this.destroyTwoVideos();
      this.Mostrar = false;
    });
  }

  destroyOneVideo() {
    this.src.removeAttribute("src");
    this.video.load();
    this.video.pause();
    this.video.remove();
    console.log(this.src);
    clearInterval(this.intervalID);
  }

  destroyTwoVideos() {
    this.src.removeAttribute("src");
    this.video.load();
    this.video.pause();
    this.video.remove();
    console.log(this.src);
    clearInterval(this.intervalID);
  }

  isScrolledIntoView() {
    const rect = this.video.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    if (this.video) {
      if (topShown && bottomShown) {
        if (!this.pauseVideo) {
          this.video.play();
          this.paused = false;
        }
      } else {
        if (!this.paused) {
          this.video.load();
          this.video.pause();
          this.paused = true;
        }
      }
    }
  }
  pause() {
    if (this.oneVideo) {
      if (!this.pauseVideo) {
        this.pauseVideo = true;
        this.video.pause();
      } else {
        this.pauseVideo = false;
        this.video.play();
      }
    } else {
      if (!this.pauseVideo) {
        this.pauseVideo = true;
        this.video.pause();
      } else {
        this.pauseVideo = false;
        this.video.play();
      }
    }
  }
}
