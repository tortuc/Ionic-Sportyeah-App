import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  LoadingController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { INew, IPost, IFile, IComment } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";
import { NewsService } from "src/app/service/news.service";
import { PostService } from "src/app/service/post.service";
import { QuestionService } from "src/app/service/question.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";


enum Texts {
  commentTitle = "new_comment.title",
  respondTitle = "respond_comment"
}

@Component({
  selector: "comment-post",
  templateUrl: "./comment-post.component.html",
  styleUrls: ["./comment-post.component.scss"],
})
export class CommentPostComponent implements OnInit {

  public readonly Texts = Texts
  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    private translate: TranslateService,
    private postService: PostService,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private toastController: ToastController,
    private commentService: CommentService,
    public newsService: NewsService,
    public questionService: QuestionService
  ) {}

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    post: [null],
  });

  @Input() post: IPost;
  @Input() comment: IComment;
  @Input() news: INew;

  @Input() postPage: boolean = false;

  @ViewChild(MentionsDirective) mentions: MentionsDirective;
  @ViewChild("openImage") openImage: ElementRef;
  @ViewChild("mainInput") mainInput: ElementRef;
  @ViewChild("assetsBtn") assetsBtn: AssetsButtonsComponent;

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
    console.log("emojis");
    
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

  creating = false;

  async send() {
    this.creating = true;
    // obtenemos los datos del formulario
    let comment = this.form.value;

    // le asignamos los archivos (si son videos se sobrescribiran)

    comment.files = await this.postService.uploadsVideos(
      this.videosToUploads,
      this.files
    );

    // asignamos valor real del input, con los emojis y los usuarios mencionados
    comment.message = this.mainInput.nativeElement.innerHTML;
    // creamos el loading
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });

    comment.question = await this.assetsBtn.saveQuestion(this.question);

    // presentamos el loading
    loading.present();
    if (!this.news) {
      comment.post = this.post?._id;
      comment.comment = this.comment?._id;
      this.postService
        .newComment(comment)
        .toPromise()
        .then((comment) => {
          this.newCommentSuccess(comment, loading);
        })
        .catch((err) => {
          this.creating = false;
          // handle err
          loading.dismiss();
        });
    } else {
      comment.news = this.news._id;
      this.newsService
        .newComment(comment)
        .toPromise()
        .then(async (comment) => {
          this.newCommentSuccess(comment, loading);
        })
        .catch((err) => {
          this.creating = false;
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
    this.modalController.dismiss().catch((e) => {
      // handle
    });
    // creamos un mensaje tipo toast, que se creo el mensaje
    const toast = await this.toastController.create({
      message: this.translate.instant("new_comment_success"),
      duration: 1500,
    });
    // mostramos el mensaje
    toast.present();
    // Activamos el sonido del nuevo comentario
    this.commentService.commentAudio();
    this.commentService.newCommen$.next(comment)
  }

  reset() {
    this.creating = false;

    this.form.controls.message.setValue("");
    this.files = [];
    this.question.questionGroup = null;
  }

  videosToUploads = [];

  removeFile(url) {
    this.files = this.files.filter((file) => {
      return file.url != url;
    });
    this.videosToUploads = this.videosToUploads.filter((video) => {
      return video.url != url;
    });
  }

  loading = false;
  files: IFile[] = [];

  //Para hacer cuestionarios en lo comentarios
  question = {
    user: this.userService.User._id,
    questionGroup: null,
    finishVotes: undefined,
  };

  async editQuestion() {
    this.assetsBtn.editQuestion(this.question.questionGroup);
  }

  deleteQuestion() {
    this.question.questionGroup = null;
  }

  newQuestion($event) {
    this.question.questionGroup = $event;
  }

  pushVideoToUpload(file) {
    this.videosToUploads.push(file);
  }

  addFile(file) {
    this.files.push(file);
    console.log(this.files);
    
  }
}
