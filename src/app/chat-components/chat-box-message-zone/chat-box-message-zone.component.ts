import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat } from "src/app/models/IChat";
import { IPostFile } from "src/app/models/iPost";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";
@Component({
  selector: "chat-box-message-zone",
  templateUrl: "./chat-box-message-zone.component.html",
  styleUrls: ["./chat-box-message-zone.component.scss"],
})
export class ChatBoxMessageZoneComponent implements OnInit {
  @Input() chat: IChat;
  @ViewChild("assetsBtn") assetsBtn: AssetsButtonsComponent;

  emojis: boolean;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public userService: UserService,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public keyboard: Keyboard,
    public cd:ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.cd.detectChanges()
    console.log(this.assetsBtn);
    
    window.onclick = () => {
      this.emojis = false;
    };

    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.emojis = false;
    });
  }

  focusout(e) {
    this.caretPosition = e.target.selectionStart;
  }

  /**
   * Formulario para los mensajes
   *
   */

  form = this.fb.group({
    message: ["", Validators.required],
    chat: ["", Validators.required],
  });

  files: IPostFile[] = [];

  caretPosition;

  addEmoji(ev) {
    const newText =
      this.form.controls.message.value.substring(0, this.caretPosition) +
      ev.emoji.native +
      this.form.controls.message.value.substring(this.caretPosition);
    this.form.controls.message.setValue(newText);
  }

  openEmojis() {
    this.emojis = !this.emojis;
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  /**
   * videos a subir posteriormente
   */
  videosToUploads = [];

  /**
   * Reinicia el formulario, y los archivos
   */

  resetForm() {
    this.form.controls.message.setValue("");
    this.files = [];
    this.videosToUploads = [];
    this.question.questionGroup = null;
  }
  /**
   * Enviar mensaje
   * @param e
   */

  async send(e) {
    // this.readMessages(this.messages, this.chat._id);
    this.emojis = false;
    /**
     * Evita que al tocar la letra enter, este salte linea, y en su lugar manda el mensaje
     */
    e.preventDefault();
    // obtenemos el mensaje (mensaje y id del chat donde se envia)
    let msg = this.form.value;
    // obtenemos los archivos de este mensaje
    let filesToUpload = this.files;
    // obtenemos los videos (si existen) de este mesnaje
    let videos = this.videosToUploads;
    msg.question = await this.assetsBtn.saveQuestion(this.question);

    if (msg.message || filesToUpload.length > 0) {
      this.resetForm();
      this.messageService
        .filesToUploads(filesToUpload, videos)
        .then((files) => {
          msg.files = files;
          this.messageService.newMessage(msg);
        })
        .catch((e) => {
          //algo salio mal
        });
    }
  }

  /**
   * Envia un audio por el chat
   * @param url url del audio
   */
  msgAudio(url) {
    this.messageService.newMessage({
      audio: url,
      chat: this.form.controls.chat.value,
    });
  }

  addFile(file) {
    this.files.push(file);
  }

  pushVideoToUpload(file) {
    this.videosToUploads.push(file);
  }

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
}
