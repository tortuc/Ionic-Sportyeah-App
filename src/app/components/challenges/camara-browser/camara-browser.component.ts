import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  @Input() timeLimit: number = 60
  time:number = 0

  // VARIABLES FOR THE RECORDING
  public stopRecording = new Subject<void>();
  public startRecording = new Subject<void>();
  public recording: boolean = false;
  public stream: any = null;
  video = null;

  public paused: boolean = false;

  constructor(
    public jdvService: JdvimageService,
    public img: ImgVideoUpload,
    public loading: LoadingController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const video = <HTMLVideoElement>document.getElementById("video2");
      this.video = video;
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
          errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        }
      }

      // Success
      const handleSuccess = (stream: any) => {
        video.srcObject = stream;
        this.stream = new MediaRecorder(stream);
        this.initRecord()
        this.startRecording.pipe(take(1)).subscribe(() => this.initRecord());
        this.stopRecording.pipe(take(1)).subscribe(() => this.finisheRecord());
      };

      // Load init
      init();
    }, 1000);
  }

  initRecord() {
    this.recording = true;
    this.stream.start();
    this.plusOne()
  }

  plusOne(){
    if(0 < this.timeLimit){
      setTimeout(()=>{
        this.timeLimit -= 1
        this.plusOne()
      },1000)
    }else{
      this.finisheRecord()
    }
  }

  async finisheRecord() {
    this.recording = false;
    const loading = await this.loading.create({
      cssClass: "",
      message: "Cargando...",
      duration: 1000000,
    });
    await loading.present();
    this.stream.ondataavailable = (data) => {
      let form = new FormData();
      // new blob
      if (data.data.size > 0) {
        const blobnew = new Blob([data.data], { type: "video/mp4" });
        form.append("video", blobnew);
        this.jdvService
          .uploadVideo(form)
          .then((r)=>{
            this.media.emit({r,loading});
          })
          .catch(()=>{
            loading.dismiss()
          })
         
      }
    };
    this.stream.requestData();
    this.stream.stop();
  }

  pause() {
    this.stream.pause();
    this.paused = true;
  }

  reanude() {
    this.stream.resume();
    this.paused = false;
  }
}
