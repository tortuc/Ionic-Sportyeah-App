import {
  Component,
  OnInit,
  Sanitizer,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { DomSanitizer } from "@angular/platform-browser";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImgVideoUpload } from "../../../service/reusable-img-video-logic.service";
import { AwardService } from "src/app/service/awards.service";
import { UserService } from "src/app/service/user.service";
import * as moment from "moment";

@Component({
  selector: 'app-new-awards',
  templateUrl: './new-awards.page.html',
  styleUrls: ['./new-awards.page.scss'],
})
export class NewAwardsPage implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  
  form: FormGroup = null;
  content: string[] = [];

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    public imgVideoUpload: ImgVideoUpload,
    private loadingController: LoadingController,
    public awardService: AwardService,
    public userService: UserService,
    public router: Router
  ) {
    this.awardService.awardSelected !== null ? this.generateFormEdit() : this.generateFormCreate();
  }

  ngOnInit() {
    this.imgVideoUpload.content.subscribe((url:string) => {
      this.content.push(url);
    });
  }

  generateFormCreate() {
    this.form = this.fb.group({
      userId: [this.userService.User._id],
      position: ["", [Validators.required]],
      federationTeam: ["", [Validators.required]],
      place: ["", [Validators.required]],
      eventDate: [new Date(), [Validators.required]],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      multimediaContent: [null],
      date: [new Date()],
      deleted: [false],
    });
  }

  generateFormEdit() {
    this.form = this.fb.group({
      _id: [this.awardService.awardSelected._id],
      userId: [this.userService.User._id],
      position: [this.awardService.awardSelected.position, [Validators.required]],
      federationTeam: [this.awardService.awardSelected.federationTeam, [Validators.required]],
      place: [this.awardService.awardSelected.place, [Validators.required]],
      title: [this.awardService.awardSelected.title, [Validators.required]],
      eventDate: [this.awardService.awardSelected.eventDate, [Validators.required]],
      description: [this.awardService.awardSelected.description, [Validators.required]],
      multimediaContent: [this.awardService.awardSelected.multimediaContent],
      date: [this.awardService.awardSelected.date],
      deleted: [this.awardService.awardSelected.deleted],
    });
    this.content = this.awardService.awardSelected.multimediaContent;
  }

  async alert(header, message, btn) {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: btn }],
    });
    await alert.present();
  }

  AddMultimedia() {
    this.imgVideoUpload.takePhotoFrom(this.fileChooser);
  }

  deleteContent(url: string) {
    this.content.splice(this.content.indexOf(url), 1);
  }

  save() {
    this.form.value.multimediaContent = this.content;
    this.awardService.awardSelected === null
      ? this.awardService
          .create(this.form.value)
          .subscribe((res) => this.awardService.getByUser(this.userService.User._id),err=>console.log(err))
      : this.awardService.edit(this.form.value);
    console.log(this.awardService.awards);
    this.router.navigate(["profile"]);
  }

}
