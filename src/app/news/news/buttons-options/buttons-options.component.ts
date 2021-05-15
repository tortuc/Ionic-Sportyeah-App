import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component";
import { IPostFile } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { MessageService } from "src/app/service/message.service";
import { QuestionService } from "src/app/service/question.service";
import { GifsModalComponent } from "src/app/shared-components/gifs-modal/gifs-modal.component";
import { ImagePickerComponent } from "src/app/shared-components/image-picker/image-picker.component";
import { VideoPickerComponent } from "src/app/shared-components/video-picker/video-picker.component";
@Component({
  selector: 'buttons-options',
  templateUrl: './buttons-options.component.html',
  styleUrls: ['./buttons-options.component.scss'],
})
export class ButtonsOptionsComponent implements OnInit {

  // @Output() emoji = new EventEmitter();
  @ViewChild("openImage") fileChooser: ElementRef;
  // @ViewChild("openImageEdit") fileChooserEdit: ElementRef;

  @Input() chat: boolean = false;
  @Input() editPost: boolean = false;
  @Input() question = null;
  // @Input() files: IPostFile[] = [];
  @Input() group:boolean = false;

  @Output() videoToUpload = new EventEmitter();
  @Output() newFile = new EventEmitter();
  @Output() editedFile = new EventEmitter();

  @Output() newText = new EventEmitter();

  @Output() newYoutube = new EventEmitter();

  
  @Output() editLink = new EventEmitter();
  @Output() questionEdited = new EventEmitter();

  // clickEmoji(ev) {
  //   this.emoji.emit(ev);
  // }

  uploadFile(event) {
    this.uploadImages(event.target.files);
  }

  constructor(
    public platform: Platform,
    private fileService: JdvimageService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private messageService: MessageService,
    private questionService: QuestionService
  ) {}

  canCreateQuestion = true;
  ngOnInit() {
    
  
  }

  ngOnChanges() {
    if(this.editPost){
      this.canCreateQuestion = false
    }else if(this.chat && !this.group){
      this.canCreateQuestion = false
    }else{
      this.canCreateQuestion = true
    }
  }

edit= false;  
  assetsOptions(option) {
    this.edit = false;
    switch (option) {
      case "galery":
        this.fileChooser.nativeElement.click();
        break;
      case "link": 
        this.link();
        break;

      case "gif":
        this.gif();
        break;

      case "text":
        this.text();
        break;

      case "youtube":
        this.youtube();
        break;

      // case "online":
      //   this.filesOnline();
      //   break;

      case "camera":
        this.fileService.takePhoto().then((file) => {
          this.newFile.emit(file);
        });
        break;

      default:
        break;
    }
  }

  async link() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("attach_link.header"),
      inputs: [
        {
          placeholder: this.translate.instant("attach_link.url"),
          name: "url",
          type: "text",
          attributes: {
            required: true,
          },
        },
        {
          placeholder: this.translate.instant("attach_link.name"),
          name: "name",
          type: "text",
        },
      ],
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant("accept"),
          handler: (data) => {
            if (data.url) {
              data.format = "link";
              this.newFile.emit(data);
            }
          },
        },
      ],
    });

    alert.present();
  }

 async editedLink(i){
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("attach_link.edit_link"),
      inputs: [
        {
          placeholder: this.translate.instant("attach_link.url"),
          name: "url",
          type: "text",
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant("news.edit"),
          handler: (data) => {
            if (data.url) {
              data.format = "link";
              data.position = i;
              this.editLink.emit(data);
            }
          },
        },
      ],
    });
    alert.present();
  }

  /**
   * Subir imagenes, o videos de forma masiva
   */
  uploadImages(files, i = 0) {
    console.log("Original", files[i].type.split("/")[0]);

    if (files.length > i) {
      let name = files[i].type.split("/")[0];

      let formData: FormData = new FormData();
      if (name == "video") {
        let url = URL.createObjectURL(files[i]);
        this.videoToUpload.emit({ file: files[i], url });
        this.newFile.emit({ url, format: "video" });

        this.uploadImages(files, ++i);
      } else if (name == "image") {
        formData.append("image", files[i]);
        this.fileService
          .uploadImageProgress(formData)
          .then((url: string) => {
            if(this.edit){
              console.log("edtito desde el upload images");
              
              this.editedFile.emit({ url, format: "image",position:this.editImageVideo});
              this.editImageVideo =undefined
            }else{
              this.newFile.emit({ url, format: "image" });
            }

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

  async filesOnline() {
    let action = await this.actionSheetController.create({
      header: this.translate.instant("images_online.header"),
      buttons: [
        {
          text: this.translate.instant("images_online.image"),
          icon: "images",
          handler: () => {
            this.imagesOnline();
          },
        },
        {
          text: this.translate.instant("images_online.video"),
          icon: "videocam",
          handler: () => {
            this.videosOnline();
          },
        },
      ],
    });
    action.present();
  }

  async imagesOnline() {
    let modal = await this.modalController.create({
      component: ImagePickerComponent,
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined && "image" in data.data) {
        this.fileService
          .uploadImageFromUrl(data.data.image.largeImageURL, true)
          .then((url: string) => {
            this.newFile.emit({
              url,
              format: "image",
            });
          });
      }
    });

    return await modal.present();
  }

  async videosOnline() {
    let modal = await this.modalController.create({
      component: VideoPickerComponent,
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined && "video" in data.data) {
        this.fileService
          .uploadVideoFromUrl(data.data.video.videos.medium.url, true)
          .then((url: string) => {
            this.newFile.emit({
              url,
              format: "video",
            });
          });
      }
    });

    return await modal.present();
  }

  /**
   * Esta funcion la llama el file picker
   */

  async uploadDocumet($event) {
    this.uploadDocumets($event.target.files);
  }

  /**
   * Subir documentos de forma masiva
   * @param files
   * @param i
   */

  uploadDocumets(files: any[], i = 0) {
    if (files.length > i) {
      let formData: FormData = new FormData();
      formData.append("file", files[i]);
      this.fileService
        .uploadFile(formData)
        .toPromise()
        .then((data: any) => {
          this.newFile.emit({
            url: data.url,
            name: data.name,
            format: "document",
          });
          this.messageService.playDropsound();
          this.uploadDocumets(files, ++i);
        })
        .catch((err) => {
          this.uploadDocumets(files, ++i);
        });
    }
  }

  async gif() {
    let modal = await this.modalController.create({
      component: GifsModalComponent,
    });

    modal.onDidDismiss().then((response) => {
      if (response.data?.url) {
        this.newFile.emit({
          url: response.data.url,
          format: "imageGif",
        });
      }
    });

    modal.present();
  }


  // uploadFileEdit(files, i = 0){
    
  //   console.log("me usaron", files[i].type.split("/")[0]);
  //     if (files.length > i) {
  //       let name = files[i].type.split("/")[0];
  //       let formData: FormData = new FormData();
  //       if (name == "video") {
  //         let url = URL.createObjectURL(files[i]);
  //         this.videoToUpload.emit({ file: files[i], url });
  //         this.editedFile.emit({ url, format: "video" ,position:this.editImageVideo});
  //         this.editImageVideo = undefined
          
  //       } else if (name == "image") {

  //         formData.append("image", files[i]);
  //         this.fileService
  //           .uploadImageProgress(formData)
  //           .then((url: string) => {
  //             this.editedFile.emit({ url, format: "image",position:this.editImageVideo });
  //             this.editImageVideo = undefined
  //             console.log(url);
  //           })
  //           .catch((e) => {
  //             this.uploadImages(files, ++i);
  //           });
  //       } else {
  //         // handle
  //       }
  //     }
  // }
  editImageVideo
  async editFile(format,i){
    this.edit= true
    this.editImageVideo = i
    if(format == "imageGif"){
      let modal = await this.modalController.create({
        component: GifsModalComponent,
      });
  
      modal.onDidDismiss().then((response) => {
        if (response.data?.url) {
          this.editedFile.emit({
            url: response.data.url,
            format: "imageGif",
            position:i
          });
          this.editImageVideo = undefined
        }
      });
      modal.present();
    }else{
      this.fileChooser.nativeElement.click();
    }
  }

  text(){
    this.newText.emit(true);
  }

  youtube(){
    this.newYoutube.emit(true);
  }
  @Output() newQuestion = new EventEmitter();

  //Crea una modal donde se pueden crear preguntas
  async createQuestion() {
    const modal = await this.modalController.create({
      component: NewQuestionComponent,
      cssClass: "my-custom-class",
      backdropDismiss: false,
      componentProps: {
        edit: false,
      },
    });
    modal
      .onDidDismiss()
      .then((data) => {
        if (data.data.question != undefined) {
          this.newQuestion.emit(data.data.question);
        }
      })
      .catch((err) => {});

    return await modal.present();
  }

  async editQuestion(question,i) {
    
    const modalEdit = await this.modalController.create({
      component: NewQuestionComponent,
      cssClass: "my-custom-class",
      backdropDismiss: false,
      componentProps: {
        question,
        edit: true,
      },
    });
    modalEdit
      .onDidDismiss()
      .then((data) => {
        if (data.data.question != undefined) {
          data.data.position = i
          this.questionEdited.emit(data.data);
        }
      })
      .catch((err) => {});
    return await modalEdit.present();
  }

  saveQuestion(question) {
    return new Promise((resolve, reject) => {
      if (!question.questionGroup) {
        resolve(null);
      } else {
        this.questionService
          .create(question)
          .pipe(take(1))
          .subscribe(
            (question: any) => {
              resolve(question._id);
            },
            (err) => {
              reject(err);
            }
          );
      }
    });
  }
}
