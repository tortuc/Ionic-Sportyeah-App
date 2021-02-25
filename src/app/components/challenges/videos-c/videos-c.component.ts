import { Subject } from "rxjs";
import { JdvimageService } from "./../../../service/jdvimage.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

declare var MediaRecorder: any;
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
  public streamRecorder = null;
  public videoHere: boolean = false;
  public stopRecording = new Subject<void>();
  public startRecording = new Subject<void>();
  public recording: boolean = false;
  public stream: any = null;
  constructor(
    public img: ImgVideoUpload,
    public alert: AlertController,
    public trans: TranslateService,
    public loadingController: LoadingController,
    public jdvService: JdvimageService
  ) {}
  async challenge() {
    this.img.takeOnlyVideo(this.fileChooser);
    this.img.content.pipe(take(1)).subscribe((r: string | null) => {
      if (r !== null) {
        this.media = r;
        const int = setInterval(() => {
          if (this.verifyVideoMinutes() === 1) clearInterval(int);
        }, 1000);
      } else {
        this.takeVideoHere();
      }
    });
  }

  takeVideoHere() {
    this.videoHere = true;
    setTimeout(() => {
      const video = <HTMLVideoElement>document.getElementById("video2");
      const canvas = <HTMLCanvasElement>document.getElementById("canvas");
      const snap = document.getElementById("snap");
      const errorMsgElement = document.querySelector("span#errorMsg");

      const constraints = {
        audio: true,
        video: true,
      };

      // Access webcam
      async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          handleSuccess(stream);
        } catch (e) {
          console.log(e);
          errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        }
      }

      // Success
      const handleSuccess = (stream: any) => {
        video.srcObject = stream;
        this.stream = new MediaRecorder(stream);
        this.startRecording.pipe(take(1)).subscribe(() => this.initRecord());
        this.stopRecording.pipe(take(1)).subscribe(() => this.finisheRecord());
      };

      // Load init
      init();
    }, 1000);
  }

  initRecord() {
    console.log("This is the stream", this.stream);
    this.recording = true;
    this.streamRecorder = this.stream.start();
    console.log("This stream state after start", this.stream.state);
  }

  finisheRecord() {
    this.recording = false;
    this.stream.ondataavailable = (data) => {
      console.log(data);
      console.log("On data available", data.data);
      let form = new FormData();
      // new blob
      const blobnew = new Blob([data.data],{type:'video/mp4'})
      form.append("video", blobnew);
      this.jdvService
        .uploadVideo(form)
        .pipe(take(1))
        .subscribe((r) => {console.log(r);});
    };
    this.stream.requestData();
    console.log("This is stream after requesting data", this.stream);
    this.stream.stop();
    console.log("This stream state after stop", this.stream);
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

  nextFunc() {
    this.next.emit(this.media);
  }

  ngOnInit() {}
}
