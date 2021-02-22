import { TranslateService } from "@ngx-translate/core";
import {
  ChallengeService,
  IChallenge,
  IReference,
  IAward,
  IUserc,
} from "../../../service/challenge.service";
import { AlertController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateChallengeComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  @Input() challenged: IReference | null;
  public public: boolean = true;
  public form: FormGroup = this.fb.group({
    challenge: ["", [Validators.required]],
    title: ["", Validators.required],
    description: ["", Validators.required],
  });
  public awards: IAward[] = [];
  public award: boolean = false;
  public createAward: boolean = true;
  public instructions: string = null;
  public videoInvalid: boolean = true;
  public novideo: boolean = null;
  constructor(
    public toast: ToastController,
    public fb: FormBuilder,
    public trans: TranslateService,
    public img: ImgVideoUpload,
    public mc: ModalController,
    public alert: AlertController,
    public loadingController: LoadingController,
    public userService: UserService,
    public challengeService: ChallengeService
  ) {}

  ngOnInit() {
    if (this.challenged !== null) {
      this.createAward = false;
    }
  }

  async challenge() {
    this.novideo = true;
    this.img.takeOnlyVideo(this.fileChooser);
    this.img.content.pipe(take(1)).subscribe((r) => {
      this.form.controls.challenge.setValue(r);
      this.novideo = false;
      const int = setInterval(() => {
        if (this.verifyVideoMinutes() === 1) clearInterval(int);
      }, 4000);
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
      console.log(video.duration / 60 > 1);
      if (video.duration / 60 > 1) {
        this.alertINIT();
      } else if (isNaN(video.duration)) {
        this.alertINIT();
      } else {
        console.log("Video valido");
        this.videoInvalid = false;
      }
      return 1;
    }
  }

  async saveChallenge() {
    console.log(this.form.value);
    console.log(this.awards);
    const loading = await this.loadingI();
    const userReference: IUserc = {
      appName: "SportYeah",
      referenceId: this.userService.User._id,
    };

    const challenging: IReference = {
      userId: userReference,
      media: this.form.value.challenge,
      reactions: [],
      comments: [],
      display: 0,
    };
    var newChallenge: IChallenge = null;
    if (this.challenged === null) {
      newChallenge = {
        challenging,
        challenged: challenging,
        public: this.public,
        awards: this.awards,
        title: this.form.value.title,
        description: this.form.value.description,
        challenges: [],
      };
    } else {
      console.log(this.challenged);
      newChallenge = {
        challenging: this.challenged._id,
        challenged: challenging,
        public: this.public,
        awards: this.awards,
        title: this.form.value.title,
        description: this.form.value.description,
        challenges: [],
      };
    }
    this.challengeService
      .create(newChallenge)
      .pipe(take(1))
      .subscribe(
        async (r: IChallenge) => {
          console.log(r);
          loading.dismiss();
          const toast = await this.toast.create({
            message: `Desafío creado.`,
            duration: 1000,
          });
          await toast.present();
          this.mc.dismiss();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  async loadingI() {
    const loading = await this.loadingController.create({
      message: `Loading...`,
    });
    await loading.present();
    return loading;
  }

  saveAward($event) {
    console.log($event);
    this.award = false;
    if ($event) this.awards.push($event.event);
  }
}
