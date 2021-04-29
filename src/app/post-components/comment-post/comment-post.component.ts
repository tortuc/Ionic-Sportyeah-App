import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormsModule, Validators } from "@angular/forms";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { INew, IPost, IPostFile } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { NewsService } from "src/app/service/news.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
// import { ImagePickerComponent } from "../image-picker/image-picker.component";
// import { VideoPickerComponent } from "../video-picker/video-picker.component";

@Component({
  selector: "comment-post",
  templateUrl: "./comment-post.component.html",
  styleUrls: ["./comment-post.component.scss"],
})
export class CommentPostComponent implements OnInit {
  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    private translate: TranslateService,
    private imageService: JdvimageService,
    private postService: PostService,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private toastController: ToastController,
    private commentService: CommentService,
    private alertCtrl: AlertController,  
      public newsService:NewsService,

  ) {}

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    post: [null],
  });

  @Input() post: IPost;
  @Input() news: INew;

  @Input() postPage: boolean = false;

  @ViewChild(MentionsDirective) mentions: MentionsDirective;
  @ViewChild("openImage") openImage: ElementRef;
  @ViewChild("mainInput") mainInput: ElementRef;

  ngOnInit() {
    try {
      window.onclick = () => {
        this.emoji = false;
      };
    } catch (error) {
      // err
    }
  }

  /**
   * Add emoji
   * @param ev
   */

  lastCaretPosition = 0;
  addEmoji(ev) {
    this.mentions.setEmoji(ev.emoji.native);
  }

  /**
   * Funcion que evita que se cierren los emojis
   * @param $event
   */
  stopPropagation($event) {
    $event.stopPropagation();
  }

  // variable control para emojis

  emoji = false;
  // cambia la variable de control del emoji
  openEmojis() {
    this.emoji = !this.emoji;
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  @Output() newComment = new EventEmitter();

  async send() {
    // obtenemos los datos del formulario
    let comment = this.form.value;
    // le asignamos el post al que pertenece
    comment.post = this.post._id;
    // le asignamos los archivos (si son videos se sobrescribiran)
    console.log(this.files);
    
    comment.files = await this.postService.uploadsVideos(
      this.videosToUploads,
      this.files
    );
    console.log(comment.files);
    
    // asignamos valor real del input, con los emojis y los usuarios mencionados
    comment.message = this.mainInput.nativeElement.innerHTML;
    // creamos el loading
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    // presentamos el loading
    loading.present();
    if (this.post && !this.news) {
      comment.post = this.post._id
      this.postService
        .newComment(comment)
        .toPromise()
        .then((comment) => {
          this.newCommentSuccess(comment, loading);
        })
        .catch((err) => {
          // handle err
          loading.dismiss();
        });
    } else {
      comment.news = this.news._id
      this.newsService
        .newComment(comment)
        .toPromise()
        .then(async (comment) => {
          this.newCommentSuccess(comment, loading);
        })
        .catch((err) => {
          // handle err
        });
    }
  }

  /**
   * Se creo el nuevo comentario
   * @param comment cuerpo del comentario nuevo
   * @param loading, loading a cerrar
   */
  async newCommentSuccess(comment, loading) {
    // reiniciamos el formulario
    this.reset();
    // avisamos que hay nuevo comentario
    this.newComment.emit(comment);
    // cerramos el loading
    loading.dismiss();
    // cerramos la modal si existe
    this.modalController.dismiss();
    // creamos un mensaje tipo toast, que se creo el mensaje
    const toast = await this.toastController.create({
      message: this.translate.instant("new_comment_success"),
      duration: 1500,
    });
    // mostramos el mensaje
    toast.present();
    // Activamos el sonido del nuevo comentario
    this.commentService.commentAudio();
  }

  reset() {
    this.form.controls.message.setValue("");
    this.files = [];
  }

  videosToUploads = [];

  async uploadVideo(file) {
    let url = URL.createObjectURL(file);
    this.videosToUploads.push({ file, url });
    this.files.push({ url, fileType: "video" });
  }

  removeFile(url) {
    this.files = this.files.filter((file) => {
      return file.url != url;
    });
    this.videosToUploads = this.videosToUploads.filter((video) => {
      return video.url != url;
    });
  }

  photovideo() {
    this.imageService
      .takePhoto()
      .then((file) => {
        this.files.push(file);
      })
      .catch((err) => {});
  }

  loading = false;
  files: IPostFile[] = [];

  uploadFile(event) {
    let file = event.target.files[0];
    let name = file.type.split("/")[0];
    let formData = new FormData();
    formData.append(name, file);

    if (name == "video") {
      this.uploadVideo(file);
    } else if (name == "image") {
      this.uploadImage(formData);
    } else {
      // handle
    }
  }

  uploadImage(formData: FormData) {
    this.imageService
      .uploadImageServer(formData)
      .then((file) => {
        this.files.push(file);
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
    this.loading = true;
  }

  async imageActionSheet() {
    let buttons = [
      {
        text: this.translate.instant("img-options.galery"),
        icon: "images",
        handler: () => {
          this.openImage.nativeElement.click();
        },
      },
      // {
      //   text: this.translate.instant("img-options.online"),
      //   icon: "globe",
      //   handler: async () => {
      //     this.imageOnline();
      //   },
      // },
      {
        text: this.translate.instant("img-options.cancel"),
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
      header: "Buscar una imagen desde ",
      buttons,
    });
    await actionSheet.present();
  }

  // async imageOnline() {
  //   let modal = await this.modalController.create({
  //     component: ImagePickerComponent,
  //   });

  //   modal.onDidDismiss().then((data: any) => {
  //     if (data.data != undefined && "image" in data.data) {
  //       this.imageService
  //         .uploadImageFromUrl(data.data.image.largeImageURL,true)

  //         .then((url: string) => {
  //           this.files.push({
  //             url,
  //             fileType: "image",
  //           });
  //         });
  //     }
  //   });

  //   return await modal.present();
  // }

  async videoActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("search_video_from"),
      buttons: [
        {
          text: this.translate.instant("img-options.galery"),
          icon: "videocam",
          handler: () => {
            // this.photovideo()
            this.openImage.nativeElement.click();
          },
        },
        // {
        //   text: this.translate.instant("img-options.online"),
        //   icon: "globe",
        //   handler: async () => {
        //     let modal = await this.modalController.create({
        //       component: VideoPickerComponent,
        //     });

        //     modal.onDidDismiss().then((data: any) => {
        //       if (data.data != undefined && "video" in data.data) {
        //         this.imageService
        //           .uploadVideoFromUrl(data.data.video.videos.medium.url)
        //           .toPromise()
        //           .then((url: string) => {
        //             this.files.push({
        //               url,
        //               fileType: "video",
        //             });
        //           });
        //       }
        //     });

        //     return await modal.present();
        //   },
        // },
        {
          text: this.translate.instant("img-options.cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
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
              data.fileType = "link";
              this.files.push(data);
            }
          },
        },
      ],
    });

    alert.present();
  }
}
