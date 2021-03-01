import { TranslateService } from "@ngx-translate/core";
import {
  ChallengeService,
  IReference,
} from "./../../../service/challenge.service";
import { AlertController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular";
@Component({
  selector: "app-create-award-challenge",
  templateUrl: "./create-award-challenge.component.html",
  styleUrls: ["./create-award-challenge.component.scss"],
})
export class CreateAwardChallengeComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  @Input() challenged: IReference | null;
  @Output("save") save: EventEmitter<any> = new EventEmitter();
  public form: any = { place: "", title: "", description: "", media: "" };
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

  ngOnInit() {}

  awardMedia() {
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((r) => {
      // this.formAward.controls.media.setValue(r);
      this.form.media = r;
    });
  }

  saveAward() {
    this.save.emit({ event: this.form });
    this.reset();
  }

  close() {
    this.save.emit(null);
    this.reset();
  }

  reset() {
    this.form = { place: "", title: "", description: "", media: "" };
  }
}
