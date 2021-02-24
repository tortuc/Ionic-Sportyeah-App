import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-videos-c",
  templateUrl: "./videos-c.component.html",
  styleUrls: ["./videos-c.component.scss"],
})
export class VideosCComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: any;
  @Output() next = new EventEmitter<string>();
  public media: string = null;
  public videoValid: boolean = false;

  constructor(
    public img: ImgVideoUpload,
    public alert: AlertController,
    public trans: TranslateService,
    public loadingController: LoadingController
  ) {}
  async challenge() {
    this.img.takeOnlyVideo(this.fileChooser);
    this.img.content.pipe(take(1)).subscribe((r: string) => {
      this.media = r;
      const int = setInterval(() => {
        if (this.verifyVideoMinutes() === 1) clearInterval(int);
      }, 1000);
    });
  }

  async alertINIT() {
    const alert = await this.alert.create({
      header: "Alert",
      subHeader: this.trans.instant("challenge.videoErr"),
      buttons: [this.trans.instant("challenge.repeat")],
    });
    await alert.present();
  }

  verifyVideoMinutes() {
    const video: HTMLVideoElement = <HTMLVideoElement>(
      document.getElementById("video")
    );
    console.log(video);
    if (video && !isNaN(video.duration)) {
      console.log(video.duration);
      console.log(video.duration / 60 > 3);
      if (video.duration / 60 > 3) {
        this.alertINIT();
      } else if (isNaN(video.duration)) {
        this.alertINIT();
      } else {
        console.log("Video valido");
        this.videoValid = true;
      }
      return 1;
    }
  }
  async loadingI() {
    const loading = await this.loadingController.create({
      message: `Loading...`,
    });
    await loading.present();
    return loading;
  }

  nextFunc(){
    this.next.emit(this.media);
  }

  ngOnInit() {}
}
