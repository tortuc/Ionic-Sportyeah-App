import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { IChat } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { FilesService } from "src/app/service/files.service";

const { Camera } = Plugins;

@Component({
  selector: "app-group-image",
  templateUrl: "./group-image.component.html",
  styleUrls: ["./group-image.component.scss"],
})
export class GroupImageComponent implements OnInit {
  @Input() image: string;
  @ViewChild("openImage") chooser: ElementRef;
  @Input() id: string;
  @Input() inChat:boolean = true

  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private filesServices: FilesService,
    private chatService: ChatService,
    private loading: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss("close");
    });
  }

  ngOnInit() {}

  async edit() {
    let asc = await this.actionSheetCtrl.create({
      buttons: [
        {
          text:  this.translate.instant("chat.group.image.delete.title"),
          icon: "trash-outline",
          handler: () => {
            this.askDelete();
          },
        },
        {
          text: this.translate.instant("chat.group.image.camera"),
          icon: "camera-outline",
          handler: () => {
            this.camera();
          },
        },
        {
          text: this.translate.instant("chat.group.image.galery"),
          icon: "images-outline",
          handler: () => {
            this.chooser.nativeElement.click();
          },
        },
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
          icon: "close",
        },
      ],
    });

    asc.present();
  }

  camera() {
    let formData = new FormData();
    Camera.getPhoto({
      source:CameraSource.Camera,
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    })
      .then(async (image) => {
        let loading = await this.loading.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let blob = this.filesServices.DataURIToBlob(image.dataUrl);

        formData.append("image", blob);

        this.filesServices
          .uploadImage(formData)
          .pipe(take(1))
          .subscribe(
            (url)=>{
              this.changeImage(url,loading)
            },
            ()=>{
              loading.dismiss();
            }
          )
         
      })
      .catch((err) => {});
  }

  async askDelete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("chat.group.image.delete.header"),
      message: this.translate.instant("chat.group.image.delete.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.deleteImage();
          },
        },
      ],
    });
    alert.present();
  }

  async deleteImage() {
    let loading = await this.loading.create({
      message: this.translate.instant("loading"),
    });
    this.changeImage( "https://files.kecuki.com/v1/image/get/1616728941495",loading)
  
  }

  async uploadImg($event) {
    let loading = await this.loading.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.filesServices.uploadImage(formData)
      .pipe(take(1))
      .subscribe(
        (url) => {
         this.changeImage(url,loading)
        },
        (err) => {
          loading.dismiss();
        }
      );
  }

  
  changeImage(url,loading){
    this.chatService
    .editChat(this.id, { image: url })
    .pipe(take(1))
    .subscribe(
      (chat: IChat) => {
        this.chatService.editedChat(chat);
        this.image = chat.image;
        loading.dismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }


 

}
