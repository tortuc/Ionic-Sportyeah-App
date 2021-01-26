import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { DomSanitizer } from "@angular/platform-browser";
import {
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImgVideoUpload } from "../../../service/reusable-img-video-logic.service";
import { AptitudesService } from "src/app/service/aptitudes.service";
import { UserService } from "src/app/service/user.service";
import * as moment from "moment";

@Component({
  selector: "app-new-aptitudes",
  templateUrl: "./new-aptitudes.page.html",
  styleUrls: ["./new-aptitudes.page.scss"],
})
export class NewAptitudesPage implements OnInit {
  form: FormGroup = null;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    public imgVideoUpload: ImgVideoUpload,
    private loadingController: LoadingController,
    public aptitudesService: AptitudesService,
    public userService: UserService,
    public router: Router
  ) {
    this.aptitudesService.aptitudeSelected !== null
      ? this.generateFormEdit()
      : this.generateFormCreate();
  }

  ngOnInit() {}

  generateFormCreate() {
    this.form = this.fb.group({
      userId: [this.userService.User._id],
      title: ["", [Validators.required]],
      score: ["", [Validators.required]],
      date: [new Date()],
      deleted: [false],
    });
  }

  generateFormEdit() {
    this.form = this.fb.group({
      _id: [this.aptitudesService.aptitudeSelected._id],
      userId: [this.userService.User._id],
      title: [this.aptitudesService.aptitudeSelected.title, [Validators.required]],
      score: [
        this.aptitudesService.aptitudeSelected.score,
        [Validators.required],
      ],
      date: [this.aptitudesService.aptitudeSelected.date],
      deleted: [this.aptitudesService.aptitudeSelected.deleted],
    });
  }

  async alert(header, message, btn) {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: btn }],
    });
    await alert.present();
  }

  save() {
    this.aptitudesService.aptitudeSelected === null
      ? this.aptitudesService.create(this.form.value).subscribe(
          (res) => this.aptitudesService.getByUser(this.userService.User._id),
          (err) => console.log(err)
        )
      : this.aptitudesService.edit(this.form.value);
    console.log(this.aptitudesService.aptitudes);
    this.router.navigate(["profile"]);
  }
}
