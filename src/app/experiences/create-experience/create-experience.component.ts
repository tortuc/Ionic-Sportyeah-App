import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LinkYoutubeComponent } from "src/app/components/link-youtube/link-youtube.component";
import { IExperience } from "src/app/models/IExperience";
import { IFile } from "src/app/models/iPost";
import { ExperienceService } from "src/app/service/experience.service";
import { FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";
import { validarFechaDeInicio } from "src/app/validators/twoDates.validator";

@Component({
  selector: "app-create-experience",
  templateUrl: "./create-experience.component.html",
  styleUrls: ["./create-experience.component.scss"],
})
export class CreateExperienceComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  @Input() experience: IExperience = null;

  form: FormGroup = null;
  content: string[] = [];

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    public experienceService: ExperienceService,
    public userService: UserService,
    public router: Router,
    public readonly modalCtrl: ModalController,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly fileService: FilesService
  ) {}

  ngOnInit() {
    this.experience !== null
      ? this.generateFormEdit()
      : this.generateFormCreate();
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
      },
      { validators: validarFechaDeInicio }
    );
  }

  public edit: boolean = false;
  generateFormEdit() {
    this.edit = true;
    this.form = this.fb.group(
      {
        position: [this.experience.position, [Validators.required]],
        federationTeam: [this.experience.federationTeam, [Validators.required]],
        nowIn: [this.experience.nowIn],
        place: [this.experience.place, [Validators.required]],
        initDate: [this.experience.initDate, [Validators.required]],
        finishDate: [this.experience.finishDate],
        title: [this.experience.title, [Validators.required]],
        description: [this.experience.description, [Validators.required]],
      },
      { validators: validarFechaDeInicio }
    );
    const { files } = this.experience;
    this.setFiles(files);
  }

  /**
   * Si editamos una experiencia, pasamos los archivos de esta manera, para tener una copia y no el original (para que este no se vea afectado)
   * @param files
   */
  setFiles(files: IFile[]) {
    this.files = this.files.concat(files);
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

  deleteContent(url: string) {
    this.content.splice(this.content.indexOf(url), 1);
  }

  files: IFile[] = [];
  async newFile() {
    let action = await this.actionSheetCtrl.create({
      header: "Subir un archivo",
      buttons: [
        {
          icon: "images",
          text: "Imagen/video",
          handler: () => {
            this.fileChooser.nativeElement.click();
          },
        },
        {
          icon: "logo-youtube",
          text: "Video de youtube",
          handler: () => {
            this.youtubeVideo();
          },
        },
        {
          icon: "close",
          text: "Cancelar",
        },
      ],
    });
    return await action.present();
  }

  save() {
    let experience = this.form.value;
    experience.files = this.files;
    this.experience === null
      ? this.experienceService.create(experience, this.videosToUpload)
      : this.experienceService.edit(
          this.experience._id,
          experience,
          this.videosToUpload
        );

    this.modalCtrl.dismiss(true);
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
}
