import { ImageSeeComponent } from "./../components/image-see/image-see.component";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
} from "@ionic-native/media-capture/ngx";
import { take } from "rxjs/operators";
import { FreeImgService } from "./freeImg.service";
import { LinkYoutubeComponent } from "./../components/link-youtube/link-youtube.component";
import { Subject } from "rxjs";
import { Injectable, Input, ElementRef } from "@angular/core";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/app/service/user.service";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { AvatarComponent } from "src/app/profile/profile-edit/avatar/avatar.component";
import { JdvimageService } from "src/app/service/jdvimage.service";

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ImgVideoUpload {
  constructor(
    public userService: UserService,
    private actionSheetCtrl: ActionSheetController,
    private imageAPI: JdvimageService,
    private translate: TranslateService,
    public mediaCapture: MediaCapture,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private jdvImage: JdvimageService,
    private freeImgService: FreeImgService
  ) {}

  mediaCaptureFunc() {
    let options: CaptureImageOptions = { limit: 3 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }

  content = new Subject();
  async takeOnlyPhoto() {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("img-options.header"),
      buttons: [
        {
          text: this.translate.instant("free-img"),
          icon: "image-outline",
          handler: () => {
            this.freeImg();
          },
        },
        {
          text: this.translate.instant("img-options.camera"),
          icon: "camera",
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
  }

  public async freeImg() {
    await this.presentLoading("loading");
    this.freeImgService
      .getImages()
      .pipe(take(1))
      .subscribe(async (r: any) => {
        console.log(r);
        await this.loading.dismiss(null, null, "loading");
        const modal = await this.presentModal(r.hits);
        console.log(modal);
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data) {
          console.log(data);
          this.content.next(data);
        }
      });
  }

  async presentModal(datax: any): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: ImageSeeComponent,
      cssClass: "my-custom-class",
      componentProps: {
        data: datax,
      },
      backdropDismiss: false,
    });
    return modal;
  }

  async presentLoading(url: string): Promise<void> {
    const loadingC = await this.loading.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
      id: url,
    });
    await loadingC.present();
  }

  @Input() take: boolean = true;
  async takePhotoFrom(fileChooser: ElementRef) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("img-options.header"),
      buttons: [
        {
          text: this.translate.instant("img-options.camera"),
          icon: "camera",
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
        {
          text: this.translate.instant("img-options.video"),
          icon: "camera",
          handler: () => {
            this.video(fileChooser);
          },
        },
        {
          text: this.translate.instant("slider-logic.youtube"),
          icon: "logo-youtube",
          handler: () => {
            this.youtubeVideo();
          },
        },
        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
  }
  async takeOnlyVideo(fileChooser: ElementRef) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("img-options.header"),
      buttons: [
        // {
        //   text: this.translate.instant("img-options.video"),
        //   icon: "camera",
        //   handler: () => this.mediaCaptureFunc(),
        // },
        {
          text: this.translate.instant("img-options.video"),
          icon: "camera",
          handler: () => {
            this.video(fileChooser);
          },
        },
        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
  }

  video(fileChooser: ElementRef) {
    console.log(fileChooser.nativeElement);
    fileChooser.nativeElement.click();
  }

  async uploadFile(event) {
    let loading = await this.loading.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    let formData = new FormData();
    let file = event.target.files[0];
    if (file.type.split("/")[0] == "video") {
      formData.append("video", file);
      this.uploadVideo(formData, loading);
    } else if (file.type.split("/")[0] == "image") {
      formData.append("image", file);
      this.uploadImage(formData, loading);
    } else {
      // handle
    }
  }

  /**
   * Sube un video al servidor
   * @param formData
   */

  uploadVideo(formData: FormData, loading?) {
    this.imageAPI
      .uploadVideo(formData)
      .toPromise()
      .then((url) => {
        if (loading) loading.dismiss();
        this.content.next(url);
      })
      .catch((err) => {
        // handle
        if (loading) loading.dismiss();
        console.log(err);
      });
  }

  /**
   * Sube una imagen al servidor y la guarda en `files`
   * @param formData
   */
  uploadImage(formData: FormData, loading?) {
    this.imageAPI
      .uploadImage(formData)
      .toPromise()
      .then((url) => {
        this.content.next(url);
        if (loading) loading.dismiss();
      })
      .catch((err) => {
        // handle err
        if (loading) loading.dismiss();
      });
  }

  async youtubeVideo() {
    let modal = await this.modalCtrl.create({
      component: LinkYoutubeComponent,
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      data.data ? this.content.next(data.data) : null;
    });
    return modal.present();
  }

  async takePicture(source) {
    let formData = new FormData();
    Camera.getPhoto({
      source,
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    })
      .then(async (image) => {
        let loading = await this.loading.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let blob = this.DataURIToBlob(image.dataUrl);

        formData.append("image", blob);

        this.jdvImage
          .uploadImage(formData)
          .toPromise()
          .then((url: string) => {
            loading.dismiss();
            url ? this.content.next(url) : null;
          })
          .catch((err) => {
            loading.dismiss();
            console.error(err);
          });
      })
      .catch((err) => {});
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
}
