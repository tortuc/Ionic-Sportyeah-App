import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { JdvimageService } from "./../../../service/jdvimage.service";
declare var MediaRecorder: any;
@Component({
  selector: "app-camara-browser",
  templateUrl: "./camara-browser.component.html",
  styleUrls: ["./camara-browser.component.scss"],
})
export class CamaraBrowserComponent implements OnInit {
  @Output() media = new EventEmitter();

  // VARIABLES FOR THE RECORDING
  public stopRecording = new Subject<void>();
  public startRecording = new Subject<void>();
  public recording: boolean = false;
  public stream: any = null;

  constructor(public jdvService: JdvimageService, public img: ImgVideoUpload) {}

  ngOnInit() {
    setTimeout(() => {
      const video = <HTMLVideoElement>document.getElementById("video2");
      video.muted = true;
      const errorMsgElement = document.querySelector("span#errorMsg");

      // Access webcam
      async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
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
      if (data.data.size > 0) {
        const blobnew = new Blob([data.data], { type: "video/mp4" });
        form.append("video", blobnew);
        this.jdvService
          .uploadVideo(form)
          .pipe(take(1))
          .subscribe((r) => {
            console.log(r);
            this.media.emit(r);
          });
      }
    };
    this.stream.requestData();
    console.log("This is stream after requesting data", this.stream);
    this.stream.stop();
    console.log("This stream state after stop", this.stream);
  }
}
