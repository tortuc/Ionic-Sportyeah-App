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

  constructor() {
    setInterval(() => {
      this.isScrolledIntoView();
    }, 1000);
  }

  ngOnInit() {
    if (this.Challenge.challenging.media === this.Challenge.challenged.media) {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media + this.Challenge._id
        )
      );
      video.pause();
    } else {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media +
            this.Challenge.challenged._id +
            this.n
        )
      );
      let video2 = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenging.media +
            this.Challenge.challenging._id +
            this.n
        )
      );
      console.log(video);
      video.pause();
      video2.pause();
    }
  }

  isScrolledIntoView() {
    if (this.Challenge.challenging.media === this.Challenge.challenged.media) {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media + this.Challenge._id
        )
      );

      if (video) {
        const rect = video.getBoundingClientRect();
        const topShown = rect.top >= 0;
        const bottomShown = rect.bottom <= window.innerHeight;
        topShown && bottomShown ? video.play() : video.pause();
      }
    } else {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media +
            this.Challenge.challenged._id +
            this.n
        )
      );
      let video2 = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenging.media +
            this.Challenge.challenging._id +
            this.n
        )
      );

      if (video) {
        const rect = video.getBoundingClientRect();
        const topShown = rect.top >= 0;
        const bottomShown = rect.bottom <= window.innerHeight;
        if (topShown && bottomShown && this.pauseVideo === false) {
          video.play();
          video2.play();
        } else {
          video.pause();
          video2.pause();
        }
      }
    }
  }

  pause() {
    if (this.Challenge.challenging.media === this.Challenge.challenged.media) {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media + this.Challenge._id
        )
      );
      console.log(video);
      if (!this.pauseVideo) {
        this.pauseVideo = true;
        video.pause();
      } else {
        this.pauseVideo = false;
        video.play();
      }
    } else {
      let video = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenged.media +
            this.Challenge.challenged._id +
            this.n
        )
      );
      let video2 = <HTMLVideoElement>(
        document.getElementById(
          this.Challenge.challenging.media +
            this.Challenge.challenging._id +
            this.n
        )
      );
      console.log(video);
      if (!this.pauseVideo) {
        this.pauseVideo = true;
        video.pause();
        video2.pause();
      } else {
        this.pauseVideo = false;
        video.play();
        video2.play();
      }
    }
  }
}
