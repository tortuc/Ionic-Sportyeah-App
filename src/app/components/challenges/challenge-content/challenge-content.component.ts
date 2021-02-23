import { IChallenge } from "./../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-challenge-content",
  templateUrl: "./challenge-content.component.html",
  styleUrls: ["./challenge-content.component.scss"],
})
export class ChallengeContentComponent implements OnInit {
  @Input() Challenge: IChallenge;
  public pauseVideo: boolean = false;
  public n: number = Math.random();
  public video = null;
  public video2 = null;
  public oneVideo: boolean = null;

  constructor() {}

  ngOnInit() {
    if (
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      ) !== null ||
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge.challenged._id + this.n
      ) !== null
    )
      this.Challenge.challenging.media === this.Challenge.challenged.media
        ? this.initOneVideo()
        : this.initTwoVideos();
    else setTimeout(()=>this.ngOnInit(), 2000);
  }

  initOneVideo() {
    this.video = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      )
    );
    this.video.pause();
    this.oneVideo = true;
    this.interval();
  }

  initTwoVideos() {
    this.video = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge.challenged._id + this.n
      )
    );
    this.video2 = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenging.media +
          this.Challenge.challenging._id +
          this.n
      )
    );
    this.video.pause();
    this.video2.pause();
    this.oneVideo = false;
    this.interval();
  }

  interval() {
    setInterval(() => {
      this.isScrolledIntoView();
    }, 2000);
  }

  isScrolledIntoView() {
    const rect = this.video.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    if (this.oneVideo) {
      if (this.video) {
        topShown && bottomShown ? this.video.play() : this.video.pause();
      }
    } else {
      if (this.video) {
        if (topShown && bottomShown && this.pauseVideo === false) {
          this.video.play();
          this.video2.play();
        } else {
          this.video.pause();
          this.video2.pause();
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
        this.video2.pause();
      } else {
        this.pauseVideo = false;
        this.video.play();
        this.video2.play();
      }
    }
  }
}
