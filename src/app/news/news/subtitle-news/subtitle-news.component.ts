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
import { INew, IPost, IFile } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";
import { NewsService } from "src/app/service/news.service";
import { PostService } from "src/app/service/post.service";
import { QuestionService } from "src/app/service/question.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";

@Component({
  selector: 'subtitle-news',
  templateUrl: './subtitle-news.component.html',
  styleUrls: ['./subtitle-news.component.scss'],
})
export class SubtitleNewsComponent implements OnInit {

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
  ){}
  // form = this.fb.group({
  //   message: ["", [Validators.required]],
  // });

  @Input() subTitle:string = ""

  // @Input() postPage: boolean = false;

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
  // openEmojis() {

  //   this.emoji = !this.emoji;
  // }
  openEmojis($event) {
    this.emoji = !this.emoji;
    this.stopPropagation($event)
  }
  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  @Output() newSubTitle = new EventEmitter();
  @Output() editSubTitle = new EventEmitter();

   creating = false
 
  async send() {
    this.creating = true
    // asignamos valor real del input, con los emojis y los usuarios mencionados
    let subTitle = this.mainInput.nativeElement.innerHTML;
    // creamos el loading
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    // presentamos el loading
    loading.present();
    this.newSubTitleSuccess(subTitle, loading);
  }
  async edit() {
    this.creating = true
    // obtenemos los datos del formulario
    this.subTitle = this.mainInput.nativeElement.innerHTML;
    // asignamos valor real del input, con los emojis y los usuarios mencionados
    // subTitle.message = this.mainInput.nativeElement.innerHTML;
    // creamos el loading
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    // presentamos el loading
    loading.present();
    this.editSubTitleSuccess(loading);
  }
/**
   * Se creo el nuevo comentario
   * @param comment cuerpo del comentario nuevo
   * @param loading, loading a cerrar
   */
 async editSubTitleSuccess( loading) {
  // avisamos que hay nuevo comentario
  this.editSubTitle.emit(this.subTitle);
  // cerramos el loading
  loading.dismiss();
}

  /**
   * Se creo el nuevo comentario
   * @param comment cuerpo del comentario nuevo
   * @param loading, loading a cerrar
   */
  async newSubTitleSuccess(subTitle, loading) {
    // avisamos que hay nuevo comentario
    this.newSubTitle.emit(subTitle);
    // cerramos el loading
    loading.dismiss();
  }

  // reset() {
  //   this.creating = false

  //   this.form.controls.message.setValue("");
  // }



  loading = false;

}
