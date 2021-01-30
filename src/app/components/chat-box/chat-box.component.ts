import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat, IMessage } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service";
import getBlobDuration from "get-blob-duration";
import { SocketService } from "src/app/service/socket.service";
declare var MediaRecorder: any;

@Component({
  selector: "chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.scss"],
})
export class ChatBoxComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("chatMessage") chatContent: any;
  @ViewChild("messagesContent") messagesContent: any;
  @ViewChild("emojisContainer") emojisContainer: ElementRef;
  @ViewChild("emojiButton") emojiButton: ElementRef;
  @ViewChild("inputTextArea") inputTextArea: any;

  @Input() chat: IChat;
  urlVideo: string;
  videoFile: any;
  emojis: boolean;

  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public chatService: ChatService,
    private fb: FormBuilder,
    public messageService: MessageService,
    private loadingCtrl: LoadingController,
    public translate: TranslateService,
    private JDVImage: JdvimageService,
    public cd: ChangeDetectorRef,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  caretPosition;
  lastCaretPosition = 0;
  ngOnInit() {
    window.onclick = () => {
      this.emojis = false;
    };
    this.inputTextArea.el.addEventListener("focusout", (e) => {
      this.caretPosition = e.target.selectionStart;
    });
  }

  ngOnChanges() {
    this.getMessages(this.chat._id, true);
    this.form.controls.chat.setValue(this.chat._id);
    this.cd.detectChanges();
  }

  /**
   * Funciones para grabar audio
   */

  /**
   * Variable de control para guardar el recorder de MediaRecorder
   */
  mediaRecorder = null;

  /**
   * Variable de control para saber si el audio se guardara, o el usuario cancelo la grabacion
   */
  saveAudio = false;

  /**
   * Variable de control para el temporizador del grabador de audio
   */
  diffRecord = 0;

  /**
   * Variable de control para el setInterval que hace funcionar el temporizador
   * se apaga cuando no esta en uso, para ahorrar memoria
   */

  interval = null;

  /**
   * Cuando empieza a grabar, se crea un stream, entonces se guarda localmente para luego poder destruirla
   */

  localStream = null;

  /**
   * Funcion para empezar a grabar audio en el chat
   */
  captureAudio() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        this.localStream = stream;
        this.mediaRecorder = await new MediaRecorder(stream);
        let that = this;
        this.mediaRecorder.ondataavailable = async function (e) {
          if (that.saveAudio) {
            let formData = new FormData();
            let chunck = [];
            chunck.push(e.data);
            const blob = new Blob(chunck, { type: "audio/ogg" });
            const duration = await getBlobDuration(blob);

            formData.append("audio", blob);
            formData.append("duration", duration.toString(10));

            that.uploadAudio(formData);
          }
        };

        this.diff();
        this.mediaRecorder.start();
      });
  }

  /**
   * Sube un audio al servidor
   * @param formData
   */
  uploadAudio(formData: FormData) {
    this.JDVImage.uploadAudio(formData)
      .toPromise()
      .then((url) => {
        this.messageService
          .newMessage({
            to:
              this.chat.sender._id != this.userService.User._id
                ? this.chat.sender._id
                : this.chat.receiver._id,
            audio: url,
            chat: this.chat._id,
            message: "",
            image: "",
            document: null,
          })
          .toPromise();
      })
      .catch((err) => {
        // handle err
      });
  }

  /**
   * Deja de grabar
   * @param {boolean} option `true` si desea guardar el audio `false` si no se desea
   */
  stopRecord(option) {
    this.saveAudio = option;
    this.mediaRecorder.stop();
    clearInterval(this.interval);
    this.diffRecord = 0;
    this.localStream
      .getTracks() // get all tracks from the MediaStream
      .forEach((track) => track.stop());
  }

  /**
   * Diferencia o temporizador del audio
   */

  diff() {
    this.diffRecord = 0;
    this.interval = setInterval(() => {
      this.diffRecord += 1;
    }, 1000);
  }

  /**
   *
   */

  /**
   * Formulario para los mensajes
   *
   */

  form = this.fb.group({
    message: ["", Validators.required],
    image: [""],
    document: [null],
    chat: ["", Validators.required],
  });

  /**
   * Variable de control para el chat
   */

  messages: IMessage[] = [];

  getMessages(chat, detect = true) {
    this.messageService
      .messagesByChat(chat)
      .toPromise()
      .then((messages: any[]) => {
        this.setMessages([], detect);
        this.socketService.socket.emit("in-chat", { chat });
        this.setMessages(messages, detect);

        this.readMessages(messages, this.chat._id);
      });
  }

  scrollToButton() {
    setTimeout(() => {
      this.chatContent.scrollToBottom();
    }, 500);
  }

  async setMessages(messages: IMessage[], changes) {
    this.messages = messages;

    this.scrollToButton();

    if (changes) {
      this.cd.detectChanges();
    }
  }

  readMessages(messages: IMessage[], chat) {
    let messagesUnread = messages.filter((message) => {
      return (
        message.read == false && message.user._id != this.userService.User._id
      );
    });
    this.messageService.readMessages(messagesUnread, chat).toPromise();
  }

  updateScroll(ev = false) {
    this.chatContent.el.scrollTop = this.chatContent.el.scrollHeight + 100;
  }

  ngAfterViewInit() {
    this.socketService.socket.on("new-msg", (data) => {
      this.messages.push(data.msg);
      this.updateScroll();
      this.chatService.getMyChats();
    });

    this.socketService.socket.on("reads", (data) => {
      this.updateReads(data.messages);
    });
  }

  updateReads(messages: String[]) {
    this.chatService.reads(this.chat?._id);
    this.messages.map((message: IMessage) => {
      if (messages.includes(message._id)) {
        return (message.read = true);
      } else {
        return message;
      }
    });
  }

  async uploadDocumet($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();

    let formData: FormData = new FormData();
    formData.append("file", $event.target.files[0]);
    this.JDVImage.uploadFile(formData)
      .toPromise()
      .then((data) => {
        this.form.controls.document.setValue(data);

        loading.dismiss();
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  addEmoji(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;

    const newText =
      this.form.controls.message.value
        .replace(/&nbsp;/g, " ")
        .substring(0, this.caretPosition) +
      ev.emoji.native +
      this.form.controls.message.value
        .replace(/nbsp;/g, "")
        .substring(this.caretPosition);
    this.form.controls.message.setValue(newText);
  }

  openEmojis() {
    this.emojis = !this.emojis;

    this.inputTextArea.el.onclick = function (e) {
      e.stopPropagation();
    };

    this.emojiButton.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojisContainer.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
  }

  /**
   * Sube una imagen al servidor
   * @param $event
   */

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
        this.form.controls.image.setValue(url);
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  resetForm() {
    this.form.controls.message.setValue("");
    this.form.controls.image.setValue("");
    this.form.controls.document.setValue(null);
  }
  async send(e) {
    this.readMessages(this.messages, this.chat._id);
    this.emojis = false;
    e.preventDefault();
    let msg = this.form.value;

    if (this.videoFile != null) {
      this.sendVideo();
    }
    if (this.form.valid || msg.image != "" || msg.document != null) {
      this.form.value.to =
        this.chat.sender._id != this.userService.User._id
          ? this.chat.sender._id
          : this.chat.receiver._id;
      this.resetForm();
      if (msg.document == null) {
        this.messageService.newMessage(msg).toPromise();
      } else {
        let msgDoc = await this.messageDoc(msg);
        msg.document = null;
        this.messageService.newMessage(msgDoc).toPromise();
        if (msg.image != "" || msg.message != "") {
          this.messageService.newMessage(msg).toPromise();
        }
      }
    }
  }
  sendVideo() {
    this.form.value.to =
      this.chat.sender._id != this.userService.User._id
        ? this.chat.sender._id
        : this.chat.receiver._id;

    let msg = this.form.value;
    let formData = new FormData();
    formData.append("video", this.videoFile);
    this.JDVImage.uploadVideo(formData)
      .toPromise()
      .then((url) => {
        msg.video = url;
        this.messageService.newMessage(msg).toPromise();
        this.videoFile = null;
        this.urlVideo = null;
      });
  }

  messageDoc(msg) {
    return {
      chat: msg.chat,
      document: msg.document,
      message: "",
      to: msg.to,
      image: "",
    };
  }

  async uploadVideo($event) {
    this.urlVideo = URL.createObjectURL($event.target.files[0]);
    this.videoFile = $event.target.files[0];
  }

  closeVideo() {
    this.urlVideo = null;
    this.videoFile = null;
  }

  @Output() closeEvent = new EventEmitter();

  close() {
    this.closeEvent.emit(true);
  }
}
