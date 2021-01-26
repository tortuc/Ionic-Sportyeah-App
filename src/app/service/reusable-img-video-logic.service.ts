import { LinkYoutubeComponent } from './../components/link-youtube/link-youtube.component';
import { Subject } from 'rxjs';
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
    private imageAPI:JdvimageService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private jdvImage: JdvimageService
  ) {}

  content = new Subject();
  async takeOnlyPhoto() {
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
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
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
            this.video(fileChooser)
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
    fileChooser.nativeElement.click()
  }

  uploadFile(event){
    let formData = new FormData()
    let file = event.target.files[0]
    if(file.type.split('/')[0] == 'video'){
      formData.append('video',file)
      this.uploadVideo(formData)
    }else if(file.type.split('/')[0] == 'image'){
      formData.append('image',file)
      this.uploadImage(formData)
    }else{
      // handle      
    }
  }

  /**
   * Sube un video al servidor
   * @param formData 
   */

  uploadVideo(formData: FormData) {
    this.imageAPI.uploadVideo(formData).toPromise()
      .then((url)=>{
        this.content.next(url)
      })
      .catch((err)=>{
        // handle
      })
  }

  /**
   * Sube una imagen al servidor y la guarda en `files`
   * @param formData 
   */
  uploadImage(formData: FormData) {
    this.imageAPI.uploadImage(formData).toPromise()
      .then((url)=>{
        this.content.next(
          url
        )
      })
      .catch((err)=>{
        // handle err
      })
  }



  async youtubeVideo() {
    let modal = await this.modalCtrl.create({
      component: LinkYoutubeComponent,
    });
    modal.onDidDismiss().then((data) => {
      data.data?this.content.next(data.data):null;
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
            url?this.content.next(url):null;
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
