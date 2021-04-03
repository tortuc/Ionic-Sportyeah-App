import { IPixelBayResponse, IPixelBayIMG } from './../../models/IPixelBayResponse';
import { 
  Component, 
  OnInit, 
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { 
  Plugins, 
  CameraResultType, 
  CameraSource 
} from "@capacitor/core";
import { take } from "rxjs/operators";
import { FreeImgService } from "src/app/service/freeImg.service";
import { LinkYoutubeComponent } from "src/app/components/link-youtube/link-youtube.component";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service"
import { ImageSeeComponent } from '../image-see/image-see.component';
const { Camera } = Plugins;

@Component({
  selector: 'app-get-media',
  templateUrl: './get-media.component.html',
  styleUrls: ['./get-media.component.scss'],
})
export class GetMediaComponent implements OnInit {
  /*
   * Inputs de imagenes, videos, tanto individuales como multiples
   */
  @ViewChild('img')     img       : ElementRef
  @ViewChild('imgs')    imgs      : ElementRef
  @ViewChild('video')   video     : ElementRef
  @ViewChild('videos')  videos    : ElementRef
  /*
   * Por aqui enviaremos el material audiovisual una vez subido
   */
  content$ = new Subject();
  constructor(
    private       actionSheetCtrl    :  ActionSheetController,
    private       imageAPI           :  JdvimageService,
    private       translate          :  TranslateService,
    private       modalCtrl          :  ModalController,
    private       loading            :  LoadingController,
    private       jdvImage           :  JdvimageService,
    private       freeImgService     :  FreeImgService,
    public        reusableCI         :  ReusableComponentsIonic
  ) {}
  ngOnInit() {
    
  }
  /*
   * Botones del getMedia
   */
  youtubeVideoBtn = {
    text:null,
    icon: "logo-youtube",
    handler: () => this.youtubeVideo()
  }
  galeryImgBtn = {
    text:null,
    icon: "image-outline",
    handler: () => this.img.nativeElement.click()
  }
  galeryImgsBtn = {
    text:null,
    icon: "image-outline",
    handler: () => this.imgs.nativeElement.click()
  }
  galeryVideoBtn = {
    text:null,
    icon: "image-outline",
    handler: () => this.video.nativeElement.click()
  }
  galeryVideosBtn = {
    text:null,
    icon: "image-outline",
    handler: () => this.videos.nativeElement.click()
  }
  camaraBtn = {
    text:null,
    icon: "camera",
    handler: () => this.takePicture(CameraSource.Camera)
  }
  freeImagesBtn = {
    text:null,
    icon: "image-outline",
    handler: () => this.freeImg()
  }
  cancelBtn = {
    text:null,
    icon: "close",
    role: "cancel",
  }
  /**
    * Inicializando los textos de los botones
    */
  initBtn(){
     this.youtubeVideoBtn.text   = this.translate.instant('img-options.youtube')
     this.galeryImgBtn.text      = this.translate.instant('img-options.img')
     this.galeryImgsBtn.text     = this.translate.instant('img-options.imgs')
     this.galeryVideoBtn.text    = this.translate.instant('img-options.video')
     this.galeryVideosBtn.text   = this.translate.instant("img-options.videos")
     this.camaraBtn.text         = this.translate.instant("img-options.camera")
     this.freeImagesBtn.text     = this.translate.instant("free-img")
     this.cancelBtn.text         = this.translate.instant("cancel")
  }
  /*
   * Obtiene el material audiovisual
   */
  async getMedia(
    img     : boolean,
    imgs    : boolean,
    video   : boolean,
    videos  : boolean,
    camara  : boolean,
    freeImg : boolean
  ) {
    this.initBtn()
    const actionSheet = {
      header: this.translate.instant("img-options.header"),
      buttons: []
    }
    if(img)     actionSheet.buttons.push(this.galeryImgBtn)
    if(imgs)    actionSheet.buttons.push(this.galeryImgsBtn)
    if(video)   actionSheet.buttons.push(this.galeryVideoBtn)
    if(videos)  actionSheet.buttons.push(this.galeryVideosBtn)
    if(camara)  actionSheet.buttons.push(this.camaraBtn)
    if(freeImg) actionSheet.buttons.push(this.freeImagesBtn)
                actionSheet.buttons.push(this.cancelBtn)
    const action = await this.actionSheetCtrl.create(actionSheet)
    await action.present()
  }
  /*
   * FUNCIONES DE LOS BOTONES DE OBTENER MEDIA
   */
  /*
   * Funcion que obtiene una imagen gratis
   */
  async freeImg() {
    await this.reusableCI.loading("loading");
    this.freeImgService
      .getImages()
      .pipe(take(1))
      .subscribe(async (pixelBayResponse: IPixelBayResponse) => {
        await this.freeImgModal(pixelBayResponse.hits)
      });
  }
  /*
   * La modal de imagenes gratis
   */
  async freeImgModal(imgs: IPixelBayIMG[]): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ImageSeeComponent,
      cssClass: "my-custom-class",
      componentProps: {
        data: imgs,
      },
      backdropDismiss: false,
    });
    await modal.present()
    await this.loading.dismiss(null, null, "loading") 
    const { data } = await modal.onDidDismiss();
    if (data) this.content$.next(data);
  }
  /*
   * Abre la camara de ionic para tomar una foto
   */
  optionsIonicCamara: any = {
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
  }
  async takePicture(source) {
    const formData = new FormData();
    this.optionsIonicCamara.source = source
    Camera.getPhoto(this.optionsIonicCamara)
      .then(async (image:any) => {
        this.reusableCI.loading("loading")
        const blob = this.DataURIToBlob(image.dataUrl);
        formData.append("image", blob);
        this.jdvImage
          .uploadImage(formData)
          .toPromise()
          .then(async (url: string) => {
            await this.loading.dismiss(null, null, "loading");
            if(url) { 
              this.content$.next(url)
              this.reusableCI.toast(
                this.translate.instant( "success.img-upload")
              )
            }else this.content$.next(null);
          })
          .catch((err) => {
            this.loading.dismiss(null, null, "loading");
            this.reusableCI.toast(
              this.translate.instant("error.img-upload")
            )
          });
      })
      .catch((err) => {
        this.reusableCI.toast(
          this.translate.instant("error.camera")
        )
      });
  }
  /*
   * FUNCIONES GENERALES
   */
  /*
   * Transform un formato URI a Blob
   */
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",")
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
  }
  /**
   * Sube un video al servidor
   * @param formData
   */
  uploadVideo(formData: FormData) {
    this.reusableCI.loading("video")
    this.imageAPI
      .uploadVideo(formData)
      .toPromise()
      .then((url) => {
        this.modalCtrl.dismiss(null,null,"video")
        this.reusableCI.toast(
          this.translate.instant("success.video-upload")
        )
        this.content$.next(url)
      })
      .catch((err) => {
        this.modalCtrl.dismiss(null,null,"video")
        this.reusableCI.toast(
          this.translate.instant("error.video-upload")
        )
        this.content$.next(null)
      })
  }
  /**
   * Sube una imagen al servidor y la guarda en `files`
   * @param formData
   */
  async uploadImage(formData: FormData) {
    this.reusableCI.toast(
      this.translate.instant('info.img-upload')
    )
    this.imageAPI
      .uploadImage(formData)
      .toPromise()
      .then(async(url) => {
        this.content$.next(url)
        this.reusableCI.toast(
          this.translate.instant('success.img-upload')
        )
      })
      .catch(async(err) => {
        this.content$.next(null)
        this.reusableCI.toast(
          this.translate.instant('error.img-upload')
        )
      })
  }
  /*
   * Sube un archivo descifrando si es una imagen o un video
   * y si es uno solo o son varios
   */
  async uploadFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let formData = new FormData();
      let file = event.target.files[i];
      if (file.type.split("/")[0] == "video") {
        formData.append("video", file);
        this.uploadVideo(formData);
      } else if (file.type.split("/")[0] == "image") {
        formData.append("image", file);
        this.uploadImage(formData);
      } else {
        this.reusableCI.toast(
          this.translate.instant('error.invalidFormat')
        )
      }
    }
  }
  /*
   * Obtiene un video de youtube
   */
  async youtubeVideo() {
    const modal = await this.modalCtrl.create({
      component: LinkYoutubeComponent,
    });
    modal.onDidDismiss().then((data) => {
      if(data.data){ 
        this.content$.next(data.data)
        this.reusableCI.toast(
          this.translate.instant("success.youtube-link")
        )
      }else{
        this.content$.next(null)
      }
    });
    return modal.present();
  }
}
