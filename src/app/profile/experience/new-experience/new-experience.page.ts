import { IExperience } from "./../../../models/IExperience";
import { validarFechaDeInicio } from "./../../../validators/twoDates.validator";
import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImgVideoUpload } from "../../../service/reusable-img-video-logic.service";
import { ExperienceService } from "src/app/service/experience.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-new-experience",
  templateUrl: "./new-experience.page.html",
  styleUrls: ["./new-experience.page.scss"],
})
export class NewExperiencePage implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  experienceS: IExperience = this.experienceService.experienceS;

  form: FormGroup = null;
  content: string[] = [];

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    public imgVideoUpload: ImgVideoUpload,
    public experienceService: ExperienceService,
    public userService: UserService,
    public router: Router
  ) {
    this.experienceS !== null
      ? this.generateFormEdit()
      : this.generateFormCreate();
  }

  ngOnInit() {
    this.imgVideoUpload.content.subscribe((url: string) => {
      this.content.push(url);
    });
  }

  generateFormCreate() {
    this.form = this.fb.group(
      {
        userId: [this.userService.User._id],
        position: ["", [Validators.required]],
        federationTeam: ["", [Validators.required]],
        nowIn: [false],
        place: ["", [Validators.required]],
        initDate: [new Date(), [Validators.required]],
        finishDate: [new Date()],
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
        multimediaContent: [null],
        date: [new Date()],
        deleted: [false],
      },
      { validators: validarFechaDeInicio }
    );
  }

  generateFormEdit() {
    this.form = this.fb.group(
      {
        _id: [this.experienceS._id],
        userId: [this.userService.User._id],
        position: [this.experienceS.position, [Validators.required]],
        federationTeam: [
          this.experienceS.federationTeam,
          [Validators.required],
        ],
        nowIn: [this.experienceS.nowIn],
        place: [this.experienceS.place, [Validators.required]],
        initDate: [this.experienceS.initDate, [Validators.required]],
        finishDate: [this.experienceS.finishDate],
        title: [this.experienceS.title, [Validators.required]],
        description: [this.experienceS.description, [Validators.required]],
        multimediaContent: [this.experienceS.multimediaContent],
        date: [this.experienceS.date],
        deleted: [this.experienceS.deleted],
      },
      { validators: validarFechaDeInicio }
    );
    this.content = this.experienceS.multimediaContent;
  }

  async alert(header, message, btn) {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: btn }],
    });
    await alert.present();
  }

  deleteFinishDate() {
    this.form.controls.finishDate.setValue(new Date());
  }

  AddMultimedia() {
    this.imgVideoUpload.takePhotoFrom(this.fileChooser);
  }

  deleteContent(url: string) {
    this.content.splice(this.content.indexOf(url), 1);
  }

  save() {
    this.form.value.multimediaContent = this.content;
    this.experienceS === null
      ? this.experienceService
          .create(this.form.value)
          .subscribe(() =>
            this.experienceService.getExperiences(this.userService.User._id)
          )
      : this.experienceService
          .edit(this.form.value)
          .subscribe(() =>
            this.experienceService.getExperiences(this.userService.User._id)
          );
    this.router.navigate(["profile"]);
  }
}
