import { Component, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { AlertController, IonRouterOutlet, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat } from "src/app/models/IChat";
import { IPostFile } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service"; 
@Component({
  selector: "chat-box-message-zone",
  templateUrl: "./chat-box-message-zone.component.html",
  styleUrls: ["./chat-box-message-zone.component.scss"],
})
export class ChatBoxMessageZoneComponent implements OnInit {
  @Input() chat: IChat;

  emojis: boolean;

  constructor(
    private fb: FormBuilder,
    private JDVImage: JdvimageService,
    private messageService: MessageService,
    public userService: UserService,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public keyboard:Keyboard,
   

  ) {

  }



  ngOnInit() {
    window.onclick = () => {
      this.emojis = false;
    };

    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.emojis = false
    })
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
      this.JDVImage.uploadFile(formData)
        .toPromise()
        .then((data: any) => {
          this.files.push({
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

  /**
   * funcion que se activa cuando el usuario utiliza el file picker
   * @param $event evento con los archivos
   */

  async uploadImg($event) {
    /**
     * enviamos los archivos
     */
    this.uploadImages($event.target.files);
  }

  /**
   * videos a subir posteriormente
   */
  videosToUploads = [];

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
        this.messageService.playDropsound();

        this.uploadImages(files, ++i);
      } else if (name == "image") {
        formData.append("image", files[i]);
        this.JDVImage.uploadImageProgress(formData, true)
          .then((url: string) => {
            this.files.push({ url, format: "image" });
            this.messageService.playDropsound();

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

  /**
   * Reinicia el formulario, y los archivos
   */

  resetForm() {
    this.form.controls.message.setValue("");
    this.files = [];
    this.videosToUploads = [];
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
}
