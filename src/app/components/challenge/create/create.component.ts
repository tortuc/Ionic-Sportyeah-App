import {
  ChallengeService,
  IChallenge,
  IReference,
  IAward,
  IUserc,
} from "./../../../service/challenge.service";
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
  public form: FormGroup = this.fb.group({
    challenge: ["", [Validators.required]],
    title: ["", Validators.required],
    description: ["", Validators.required],
  });
  public formAward: FormGroup = this.fb.group({
    media: ["", [Validators.required]],
    place: ["", [Validators.required]],
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });
  public awards: IAward[] = [];
  public award: boolean = false;
  public createAward: boolean = true;
  public instructions: string = null;
  constructor(
    public toast: ToastController,
    public fb: FormBuilder,
    public img: ImgVideoUpload,
    public mc: ModalController,
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
    this.img.takeOnlyVideo(this.fileChooser);
    this.img.content.pipe(take(1)).subscribe((r) => {
      this.form.controls.challenge.setValue(r);
    });
  }

  awardMedia() {
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((r) => {
      this.formAward.controls.media.setValue(r);
    });
  }

  async saveChallenge() {
    console.log(this.form.value);
    console.log(this.awards);
    const loading = await this.loadingController.create({
      message: `Loading...`,
    });
    await loading.present();
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
        awards: this.awards,
        title: this.form.value.title,
        description: this.form.value.description,
        challenges: [],
      };
    } else {
      newChallenge = {
        challenging: this.challenged._id,
        challenged:challenging,
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
}
