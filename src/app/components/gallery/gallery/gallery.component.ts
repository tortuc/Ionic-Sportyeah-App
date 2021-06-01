import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FilesService } from "src/app/service/files.service";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";
import { LinkYoutubeComponent } from "../../link-youtube/link-youtube.component";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";

enum Texts {
  add = "gallery.add",
  actionHeader = "gallery.content.header",
  actionGallery = "gallery.content.gallery",
  actionYoutube = "gallery.content.youtube",
  title = "gallery.title",
  allContent = "gallery.allContent",
  loading = "gallery.loading",
  cancel = "cancel",
}

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  loadingFiles: boolean = false;
  allContent: boolean = false;

  constructor(
    private readonly galleryService: GalleryService,
    public readonly userService: UserService,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly translate: TranslateService,
    private readonly fileService: FilesService,
    private readonly modalCtrl: ModalController,
    private cd: ChangeDetectorRef
  ) {}

  public readonly Texts = Texts;
  ngOnInit() {
    this.galleryService.newFile$.asObservable().subscribe((file) => {
      this.gallery.unshift(file);
    });
    this.getGallery();
  }

  public gallery: IGalleryFile[] = [];
  private skip: number = 0;
  getGallery() {
    this.loadingFiles = true;
    this.galleryService
      .getById(this.userService.User?._id, this.skip)
      .subscribe(
        (gallery) => {
          this.skip += 20;
          this.gallery = this.gallery.concat(gallery);
          this.loadingFiles = false;
          if (gallery.length < 20) {
            this.allContent = true;
          }
        },
        () => {
          this.loadingFiles = false;
        }
      );
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
          .uploadImageProgress(formData, true)
          .then((url: string) => {
            this.galleryService.create({ url, format: "image" });

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
      data.data
        ? this.galleryService.create({ format: "youtube", url: data.data })
        : null;
    });
    return modal.present();
  }

  async seeFiles(index) {
    let modal = await this.modalCtrl.create({
      component: GallerySliderComponent,
      componentProps: { files: this.gallery, index },
    });
    modal.present();
  }

  /**
   * Esta funcion se llama cuando el usuario baja el scroll, y si llega muy abajo, entonces se llaman mas posts automaticamente
   * @param ev
   */
  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();

    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingFiles
    ) {
      this.getGallery();
    }
  }
}
