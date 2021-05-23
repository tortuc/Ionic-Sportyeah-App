import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { LinkYoutubeComponent } from "src/app/components/link-youtube/link-youtube.component";
import { IFile } from "src/app/models/iPost";
import { Awards, AwardService } from "src/app/service/awards.service";
import { FilesService } from "src/app/service/files.service";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "awards.create",
  fileHeader = "profile_tools.multimedia.header",
  fileImages = "profile_tools.multimedia.images",
  fileYoutube = "profile_tools.multimedia.youtube",
  cancel = "cancel",
}

@Component({
  selector: "app-create-award",
  templateUrl: "./create-award.component.html",
  styleUrls: ["./create-award.component.scss"],
})
export class CreateAwardComponent implements OnInit {
  @Input() award: Awards = null;

  public readonly Texts = Texts;

  public files: IFile[] = [];

  @ViewChild("fileChooser") fileChooser: ElementRef;

  form: FormGroup = null;

  constructor(
    public readonly translate: TranslateService,
    private readonly fb: FormBuilder,
    private readonly alertController: AlertController,
    public readonly imgVideoUpload: ImgVideoUpload,
    public readonly awardService: AwardService,
    public readonly userService: UserService,
    public readonly router: Router,
    public readonly actionSheetCtrl: ActionSheetController,
    public readonly modalCtrl: ModalController,
    private fileService: FilesService
  ) {}

  ngOnInit() {
    this.award !== null ? this.generateFormEdit() : this.generateFormCreate();
  }

  async newFile() {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant(Texts.fileHeader),
      buttons: [
        {
          icon: "images",
          text: this.translate.instant(Texts.fileImages),
          handler: () => {
            this.fileChooser.nativeElement.click();
          },
        },
        {
          icon: "logo-youtube",
          text: this.translate.instant(Texts.fileYoutube),
          handler: () => {
            this.youtubeVideo();
          },
        },
        {
          icon: "close",
          text: this.translate.instant(Texts.cancel),
        },
      ],
    });
    return await action.present();
  }

  videosToUpload = [];

  uploadFile(event) {
    this.uploadImages(event.target.files);
  }

  /**
   * Subir imagenes, o videos de forma masiva
   */
  uploadImages(files, i = 0) {
    if (files.length > i) {
      let name = files[i].type.split("/")[0];

      let formData: FormData = new FormData();
      if (name == "video") {
        let url = URL.createObjectURL(files[i]);
        this.videosToUpload.push({ file: files[i], url });
        this.files.push({ url, format: "video" });

        this.uploadImages(files, ++i);
      } else if (name == "image") {
        formData.append("image", files[i]);
        this.fileService
          .uploadImageProgress(formData)
          .then((url: string) => {
            this.files.push({ url, format: "image" });

            this.uploadImages(files, ++i);
          })
          .catch((e) => {
            this.uploadImages(files, ++i);
          });
      } else {
        // handle
      }
    }
  }

  async youtubeVideo() {
    let modal = await this.modalCtrl.create({
      component: LinkYoutubeComponent,
      backdropDismiss: false,
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then((data) => {
      data.data ? this.files.push({ format: "youtube", url: data.data }) : null;
    });
    return modal.present();
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
    });
  }

  generateFormEdit() {
    this.form = this.fb.group({
      position: [this.award.position, [Validators.required]],
      federationTeam: [this.award.federationTeam, [Validators.required]],
      place: [this.award.place, [Validators.required]],
      title: [this.award.title, [Validators.required]],
      eventDate: [
        moment(this.award.eventDate).format("YYYY-MM-DD"),
        [Validators.required],
      ],
      description: [this.award.description, [Validators.required]],
    });
    const { files } = this.award;
    this.setFiles(files);
  }

  /**
   * Si editamos una experiencia, pasamos los archivos de esta manera, para tener una copia y no el original (para que este no se vea afectado)
   * @param files
   */
  setFiles(files: IFile[]) {
    this.files = this.files.concat(files);
  }

  save() {
    let award = this.form.value;
    award.files = this.files;
    this.award === null
      ? this.awardService.create(award, this.videosToUpload)
      : this.awardService.edit(this.award._id, award, this.videosToUpload);
    this.modalCtrl.dismiss();
  }
}
