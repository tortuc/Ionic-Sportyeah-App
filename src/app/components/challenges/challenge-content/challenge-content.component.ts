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

  constructor() {}

  ngOnInit() {}

  pause() {
    if (this.Challenge.challenging.media === this.Challenge.challenged.media) {
      let video = <HTMLVideoElement>(
        document.getElementById(this.Challenge.challenged.media+this.Challenge._id)
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
        document.getElementById(this.Challenge.challenged.media+this.Challenge._id)
      );
      let video2 = <HTMLVideoElement>(
        document.getElementById(this.Challenge.challenging.media+ this.Challenge._id)
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
