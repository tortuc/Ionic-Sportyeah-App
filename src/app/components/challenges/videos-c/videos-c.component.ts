import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-videos-c",
  templateUrl: "./videos-c.component.html",
  styleUrls: ["./videos-c.component.scss"],
})
export class VideosCComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: any;
  @Input() mediaa: any;
  @Input() intentoss:any;
  @Input() timeLimit:number = 60;

  ngOnInit() {
    this.media = this.mediaa
    this.intentos = this.intentoss
    const int = setInterval(() => {
      if (this.verifyVideoMinutes() === 1) clearInterval(int);
    }, 1000);
  }

  @Output() next = new EventEmitter<any>();
  public media: string = null;
  public videoValid: boolean = null;
  public streamRecorder = null;
  public videoHere: boolean = true;
  public intentos: string[] = [];
  public subirIntentos: boolean = true;
  constructor(
    public alertController: AlertController,
    public translate: TranslateService,
    public img: ImgVideoUpload,
    public alert: AlertController,
    public trans: TranslateService,
    public loadingController: LoadingController
  ) {}

  again() {
    this.intentos.length < 3
      ? this.intentos.push(this.media)
      : this.intentos.reverse().splice(1, 0).reverse().push(this.media);
    this.media = null;
    this.challenge();
  }

  async challenge() {
    this.takeVideoHere();
  }

  takeVideoHere() {
    this.videoHere = true;
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
      document.getElementById("video2")
    );
    if (video && !isNaN(video.duration)) {
      if (video.duration === Infinity) {
        video.currentTime = 1e101;
      } else if (video.duration / 60 > 3) {
        this.videoValid = false;
        this.alertINIT();
        return 1;
      } else if (isNaN(video.duration)) {
        this.videoValid = false;
        this.alertINIT();
        return 1;
      } else {
        this.videoValid = true;
        video.currentTime = 0.00001;
        return 1;
      }
    }
  }
  async loadingI() {
    const loading = await this.loadingController.create({
      message: `Cargando...`,
    });
    await loading.present();
    return loading;
  }

  nextFunc() {
    this.presentAlert()
  }

   async presentAlert() {
     const alert = await this.alertController.create({
             cssClass: 'my-custom-class',
             header: this.translate.instant('challenge.deleteModal.sure'),
             buttons: [
               {
                 text:  this.translate.instant('challenge.deleteModal.no'),
                 role:"cancel",
               },
               {
                 text:  this.translate.instant('challenge.deleteModal.yes'),
                 role:"yes",
                 handler:()=>{
                  this.subirIntentos
                    ? 
                    this.next.emit({ media: this.media, intentos: this.intentos })
                    : this.next.emit({ media: this.media, intentos: [] });
                 }
               }
             ]
           });

     await alert.present();
   }


  camaraBrowserAns(ans: any) {
    this.media = ans.r;
    this.videoHere = false;
    const int = setInterval(() => {
      if (this.verifyVideoMinutes() === 1) {
        clearInterval(int);
        ans.loading.dismiss();
      }
    }, 1000);
  }

  close(){
    this.next.emit({ media: this.media, intentos: this.intentos, no:true })
  }
}
