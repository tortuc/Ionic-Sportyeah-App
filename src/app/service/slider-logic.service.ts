import { ImageSeeComponent } from "./../components/image-see/image-see.component";
import { take } from "rxjs/operators";
import { FreeImgService } from "./freeImg.service";
import { LinkYoutubeComponent } from "./../components/link-youtube/link-youtube.component";
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
export class SliderLogic {
  constructor(
    public userService: UserService,
    private actionSheetCtrl: ActionSheetController,
    private imageAPI: JdvimageService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private freeImgService: FreeImgService,
    private jdvImage: JdvimageService
  ) {}

  content: any[] = this.userService.User.slider;

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
          text: this.translate.instant("free-img"),
          icon: "image-outline",
          handler: () => {
            this.freeImg();
          },
        },
        {
          text: this.translate.instant("img-options.galery"),
          icon: "image-outline",
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

  video(fileChooser: ElementRef) {
    fileChooser.nativeElement.click();
  }

  public async freeImg() {
    await this.presentLoading("loading");
    this.freeImgService
      .getImages()
      .pipe(take(1))
      .subscribe(async (r: any) => {
        await this.loading.dismiss(null, null, "loading")
        const modal = await this.presentModal(r.hits)
        await modal.present()
        const { data } = await modal.onWillDismiss()
        if (data) {
          this.content.push(data)
          this.save()
        }
      });
  }

  async presentModal(data: any): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: ImageSeeComponent,
      cssClass: "my-custom-class",
      componentProps: {
        data: data,
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

  async uploadFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let formData = new FormData();
      let file = event.target.files[i];
      if (file.type.split("/")[0] == "video") {
        formData.append("video", file);
        await this.uploadVideo(formData);
      } else if (file.type.split("/")[0] == "image") {
        formData.append("image", file);
        await this.uploadImage(formData);
      } else {
        // handle
      }
    }
  }

  /**
   * Sube un video al servidor
   * @param formData
   */

  async uploadVideo(formData: FormData) {
    await this.imageAPI
      .uploadVideo(formData)
      .then((url) => {
        this.content.push(url);
          this.save()
      })
      .catch((err) => {
      });
  }

  /**
   * Sube una imagen al servidor y la guarda en `files`
   * @param formData
   */
  async uploadImage(formData: FormData) {
    const url = await this.imageAPI.uploadImage(formData).toPromise();
    this.content.push(url);
          this.save()
  }

  async youtubeVideo() {
    let modal = await this.modalCtrl.create({
      component: LinkYoutubeComponent,
    });
    modal.onDidDismiss().then((data) => {
      data.data ? this.content.push(data.data) : null;
          this.save()
    });
    return modal.present();
  }

  async chooseAvatar() {
    let modal = await this.modalCtrl.create({
      component: AvatarComponent,
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.avatarOptions(data.data);
    });
    return modal.present();
  }
  avatarOptions(data: any) {
    switch (data.action) {
      case "select":
        this.userService
          .update({ photoBanner: data.url })
          .toPromise()
          .then((resp) => {
            this.userService.User.photoBanner = data.url;
          });
        break;

      default:
        break;
    }
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
            url ? this.content.push(url) : null;
          this.save()
          })
          .catch((err) => {
            loading.dismiss();
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
  delete(name: string) {
    const index = this.content.indexOf(name);
    this.save()
    this.content.splice(index, 1);
  }
  save() {
    this.userService
      .update({ slider: this.content })
      .toPromise()
      .then((resp) => {
        this.userService.User.slider = this.content;
          this.save()
      });
  }
}
