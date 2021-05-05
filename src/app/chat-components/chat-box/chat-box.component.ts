import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat, IMessage } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service";
import { SocketService } from "src/app/service/socket.service";
import { CookieService } from "ngx-cookie-service";
import { ChatBoxMessageZoneComponent } from "../chat-box-message-zone/chat-box-message-zone.component";

@Component({
  selector: "chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.scss"],
})
export class ChatBoxComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("chatMessage") chatContent: IonContent;
  @ViewChild("messagesContent") messagesContent: any;
  @ViewChild("messageZone") messageZone: ChatBoxMessageZoneComponent;

  @Input() chat: IChat;

  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public chatService: ChatService,
    public messageService: MessageService,
    public translate: TranslateService,
    public cd: ChangeDetectorRef,
    private socketService: SocketService,
    private cookieService: CookieService
  ) {}

  ngAfterViewInit() {
    this.socketService.socket.on("new-msg", (data) => {
      let msg: IMessage = data.msg;
      this.empty = false;
      this.messages.push(msg);
      this.calcScroll(msg);

      this.chatService.getMyChats();
    });

    this.socketService.socket.on("reads", (data) => {
      this.updateReads(data.messages);
    });
  }

  newMessages = 0;
  async calcScroll(msg) {
    if (msg.user._id == this.userService.User._id) {
      this.scrollToBottom(100);
    } else {
      let el = await this.chatContent.getScrollElement();
      if (el.scrollHeight - el.scrollTop < el.clientHeight + 200) {
        this.scrollToBottom(150);
        this.readMessages([msg], this.chat._id);
      } else {
        this.newMessages += 1;
      }
    }
  }

  ngOnInit() {}

  ngOnChanges() {
    this.newChat();
  }

  /**
   * El chat ha cambiado, o abierto un nuevo hcat
   */
  newChat() {
    this.lastScrollHeight = 0
    this.chatChange = true;
    this.messages = [];
    this.skip = 0;
    this.empty = false;
    this.getMessages();
    this.cd.detectChanges();
    this.messageZone.form.controls.chat.setValue(this.chat._id);
    this.messageZone.files = [];
    this.socketService.socket.emit("in-chat", { chat: this.chat._id });
    this.cookieService.set("chat", this.chat._id);
  }

  /**
   * Variable de control, para evitar llamar mensajes de mas, al iniciar un chat que tiene scroll
   * si esta `true`, es que el chat esta cambiando es decir que es nuevo y aun hay que esperar que se calcule el scroll
   * si esta `false` significa que ya el chat, ha calculado una parte del scroll, y mando al fondo del chat para ver los nuevos mensajes y si el usuario sube el scroll, permitira buscar nuevos mensajes
   */

  chatChange = false;

  /**
   * Variable de control para el chat
   */

  messages: IMessage[] = [];

  empty = false;

  loadMessages = false;

  skip = 0;

  /**
   * Obtenemos los mensajes
   * @param chat
   * @param detect
   */
  getMessages() {
    this.loadMessages = true;
    this.messageService
      .messagesByChat(this.chat._id, this.skip)
      .toPromise()
      .then((messages: any[]) => {
        this.skip += 20;
        this.empty =
          messages.length == 0 && this.messages.length == 0 ? true : false;

        this.addMessages(messages);
      })
      .catch(() => {
        this.loadMessages = false;
      });
  }
  addMessages(messages: IMessage[]) {
    let length = messages.length;

    for (let i = 0; i < length; i++) {
      this.messages.unshift(messages.pop());
    }

    if (this.chatChange) {
      this.scrollToBottom();
    }

    this.readMessages(messages, this.chat._id);
    this.loadMessages = false;
  }

  scrollToBottom(delay = 500) {
    setTimeout(() => {
      // si llego a este punto, significa que se detecto un scroll, significa que el chat ha cambiado de tamanio
      this.chatChange = false;
      this.chatContent.scrollToBottom();
      this.newMessages = 0;
    }, delay);
  }

  readMessages(messages: IMessage[], chat) {
    let messagesUnread = messages.filter((message) => {
      return (
        message.read == false && message.user._id != this.userService.User._id
      );
    });
    this.messageService.readMessages(messagesUnread, chat).subscribe();
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

  goDown() {
    this.scrollToBottom(100);
    this.readMessages(this.messages, this.chat._id);
  }

  lastScrollHeight = 0;
  lastScrollTime = 0;

  /**
   * Calculamos cuando deja de hacer scroll si esta buscando mensajes nuevos
   * @param ev
   */
  async logScrollEnd(ev) {
    // obtenemos los elementos del scroll
    let el = await this.chatContent.getScrollElement();
    // recuperamos el scrollTOp, el tamanio del scroll y la pantalla
    let { scrollTop, scrollHeight, clientHeight } = el;

    // si no esta en scroll top 0 podemos calcular
    // evaluamos, que el chat ya cambio , y no esta empezando el scroll, asi evitamos que llame mensajes de mas
    if (
      !this.chatChange &&
      this.lastScrollHeight != scrollHeight &&
      scrollTop != 0
    ) {
      // si el tamanio del scroll es un poco mas grande que la pantalla donde estan los mensajes significa que tiene una cantidad de mensajes considerables como para buscar nuevos
      if (scrollHeight > clientHeight * 1.6) {
        // si el scroll en top, esta casi al 10% de llegar al final, buscamos mensajes nuevos
        if ((scrollTop / scrollHeight) * 100 < 5) {
          this.lastScrollHeight = scrollHeight;

          this.getMessages();
        }
      } else {
        // no hay suficiente scroll, asi que hay pocos mensajes y no es necesario buscar nuevos
      }
    } else {
      if (this.lastScrollHeight != scrollHeight && scrollHeight - this.lastScrollHeight  > 100) {
        this.chatContent.scrollToPoint(0, 30, 10);
      }
    }
  }

  clean() {
    this.skip = 0;
    this.messages = [];
  }
}
