import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FilesService } from "src/app/service/files.service";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";
import { LinkYoutubeComponent } from "../../link-youtube/link-youtube.component";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";

enum Texts {
  add = "¡Agrega una imagen a tu galeria!",
  cancel = "cancel",
  actionHeader = "Subir una imagen/video",
  actionGallery = "Galeria",
  actionYoutube = "Enlace de youtube",
}

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;

  constructor(
    private readonly galleryService: GalleryService,
    public readonly userService: UserService,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly translate: TranslateService,
    private readonly fileService: FilesService,
    private readonly modalCtrl: ModalController
  ) {}

  public readonly Texts = Texts;
  ngOnInit() {
    this.galleryService.newFile$.asObservable().subscribe((file) => {
      this.gallery.unshift(file);
    });
    this.getGallery();
  }

  public gallery: IGalleryFile[] = [];
  getGallery() {
    this.galleryService
      .getById(this.userService.User?._id)
      .subscribe((gallery) => {
        this.gallery = gallery;
      });
  }

  async addContent() {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant(Texts.actionHeader),
      buttons: [
        {
          text: this.translate.instant(Texts.actionGallery),
          icon: "images",
          handler: () => {
            this.fromGallery();
          },
        },
        {
          icon: "logo-youtube",
          text: this.translate.instant(Texts.actionYoutube),
          handler: () => {
            this.youtubeVideo();
          },
        },
        {
          text: this.translate.instant(Texts.cancel),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
  }

  fromGallery() {
    this.fileChooser.nativeElement.click();
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
        formData.append("video", files[i]);
        this.fileService
          .uploadVideo(formData, true)
          .then((url: string) => {
            this.galleryService.create({ url, format: "video" });
            this.uploadImages(files, ++i);
          })
          .catch(() => {
            this.uploadImages(files, ++i);
          });
      } else if (name == "image") {
        formData.append("image", files[i]);
        this.fileService
          .uploadImageProgress(formData)
          .then((url: string) => {
            this.galleryService.create({ url, format: "image" });
            console.log(url);

            this.uploadImages(files, ++i);
          })
          .catch((e) => {
            console.log(e);

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
      data.data
        ? this.galleryService.create({ format: "youtube", url: data.data })
        : null;
    });
    return modal.present();
  }

  async seeFiles(index) {
    console.log(index);
    
    let modal = await this.modalCtrl.create({
      component: GallerySliderComponent,
      componentProps: { files: this.gallery, index },
    });
    modal.present();
  }
}
