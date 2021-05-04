import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost, INew, IPostFile } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component";
import { convertTypeAcquisitionFromJson } from "typescript";
import { QuestionService } from "../../service/question.service";
import { EditQuestionComponent } from "src/app/components/edit-question/edit-question.component";
import { log } from "console";
import { take } from "rxjs/operators";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.page.html",
  styleUrls: ["./new-post.page.scss"],
})
export class NewPostPage implements OnInit {
  @Input() post: IPost;
  @Input() news: INew = null;
  @Input() img: string;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("editQuestionHash") editQuestionComponent: EditQuestionComponent;
  @ViewChild("openImage") fileChooser: ElementRef;
  @ViewChild("mainInput") mainInput: ElementRef;

  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    public JDVImage: JdvimageService,
    public loadingCtrl: LoadingController,
    private postService: PostService,
    private platform: Platform,
    public questionService: QuestionService,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
    if (this.img) {
      this.form.controls.image.setValue(this.img);
    }
  }

  urlVideo = null;
  videoFile = null;

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
  });
  formNews = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
  });

  closeVideo() {
    this.urlVideo = null;
    this.videoFile = null;
  }

  async uploadVideo(file) {
    let url = URL.createObjectURL(file);

    this.videosToUploads.push({ file: file, url });
    this.files.push({ url, format: "video" });
  }
  async uploadImg($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();

    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.JDVImage.uploadImage(formData)
      .toPromise()
      .then((url) => {
        loading.dismiss();
        if (!this.news) {
          this.form.controls.image.setValue(url);
        } else if (this.news) {
          this.formNews.controls.image.setValue(url);
        }
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  removeImg() {
    if (!this.news) {
      this.form.controls.image.setValue("");
    } else if (this.news) {
      this.formNews.controls.image.setValue("");
    }
  }

  newValue($event) {
    if (!this.news) {
      this.form.controls.message.setValue($event);
    } else if (this.news) {
      this.formNews.controls.message.setValue($event);
    }
  }

  async save() {
    // obtenemos la data del formulario
    let post = this.form.value;
    // si hay un post significa que es una comparticion
    post.post = this.post ? this.post._id : null;

    // agregamos los archivos al post
    post.files = this.files;

    // por ultimo al mensaje hay que agregarle el valor real del input que es un div editable

    post.message = this.mainInput.nativeElement.innerHTML;
    // si no hay videos para subir entonces se crea el post

    post.question = await this.saveQuestion();

    post.news = this.news ? this.news._id : null;

    if (this.videosToUploads.length == 0) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      this.postService
        .create(post)
        .toPromise()
        .then((post: IPost) => {
          loading.dismiss();
          this.postService.newPost(post._id);
          this.modalController.dismiss();
        })
        .catch((err) => {
          loading.dismiss();
        });
    } else {
      this.postService.uploadVideoPost(post, this.videosToUploads, this.files);
      this.modalController.dismiss();
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  lastCaretPosition = 0;

  addEmoji(ev) {
    this.mentions.setEmoji(ev.emoji.native);
  }

  emoji = false;

  stopPropagation(e) {
    e.stopPropagation();
  }
  openEmojis() {
    this.emoji = !this.emoji;
  }

  question = {
    user: this.userService.User._id,
    questionGroup: null,
    finishVotes: undefined,
  };

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
          this.question.questionGroup = data.data.question; //Las preguntas creadas se introducen en el grupo de preguntas
        }
      })
      .catch((err) => {});

    return await modal.present();
  }
  async editQuestion(i) {
    const modalEdit = await this.modalController.create({
      component: NewQuestionComponent,
      cssClass: "my-custom-class",
      backdropDismiss: false,
      componentProps: {
        question: this.question.questionGroup,
        edit: true,
      },
    });
    modalEdit
      .onDidDismiss()
      .then((data) => {
        if (data.data.question != undefined) {
          this.question.questionGroup = data.data.question;
        }
      })
      .catch((err) => {});
    return await modalEdit.present();
  }
  deleteQuestion(i) {
    this.question.questionGroup = null;
  }

  saveQuestion() {
    return new Promise((resolve, reject) => {
      if (!this.question.questionGroup) {
        resolve(null);
      } else {
        this.questionService
          .create(this.question)
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

  files: IPostFile[] = [];
  videosToUploads = [];

  loading = false;

  async imageActionSheet() {
    let buttons = [
      {
        text: this.translate.instant("img-options.galery"),
        icon: "images",
        handler: () => {
          this.fileChooser.nativeElement.click();
        },
      },
      {
        text: this.translate.instant("cancel"),
        icon: "close",
        role: "cancel",
      },
    ];

    if (this.platform.is("cordova")) {
      buttons.unshift({
        text: this.translate.instant("img-options.camera"),
        icon: "camera",
        handler: () => {
          this.photovideo();
        },
      });
    }
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("search_image_from"),
      buttons,
    });
    await actionSheet.present();
  }

  photovideo() {
    this.loading = true;
    this.JDVImage.takePhoto()
      .then((file) => {
        this.loading = false;

        this.files.push(file);
      })
      .catch((err) => {
        this.loading = false;
      });
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
              this.files.push(data);
            }
          },
        },
      ],
    });

    alert.present();
  }

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
          this.videosToUploads.push({ file: files[i], url });
          this.files.push({ url, format: "video" });
          this.uploadImages(files, ++i);
        } else if (name == "image") {
          formData.append("image", files[i]);
          this.JDVImage.uploadImageProgress(formData)
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
}
