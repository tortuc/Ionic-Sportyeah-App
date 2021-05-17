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
import { take } from "rxjs/operators";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { INew, IPost, IPostFile } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { NewsService } from "src/app/service/news.service";
import { PostService } from "src/app/service/post.service";
import { QuestionService } from "src/app/service/question.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";

@Component({
  selector: 'comment-news',
  templateUrl: './comment-news.component.html',
  styleUrls: ['./comment-news.component.scss'],
})
export class CommentNewsComponent implements OnInit {

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
  ) { }

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    news: [null],
  });

  @Input() news

  // @Input() postPage: boolean = false;

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

   creating = false
 
  async send() {
    this.creating = true
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
   
      comment.news = this.news._id;
      this.newsService
        .newComment(comment)
        .toPromise()
        .then(async (comment) => {
          this.newCommentSuccess(comment, loading);
        })
        .catch((err) => {
          this.creating = false
          // handle err
        });
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
  }

  reset() {
    this.creating = false

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
  files: IPostFile[] = [];

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
  }
}
