import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonCardContent,
  ModalController,
  Platform,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat } from "../models/IChat";
import { ChatService } from "../service/chat.service";
import { MessageService } from "../service/message.service";
import { UserService } from "../service/user.service";
import { NewChatComponent } from "./new-chat/new-chat.component";
import { Router } from "@angular/router";
import { SocketService } from "../service/socket.service";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  @ViewChild("chatMessage") chatContent: IonCardContent;

  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public chatService: ChatService,
    public messageService: MessageService,
    public translate: TranslateService,
    private socketService: SocketService,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.messageService.playSound(null);
      if (this.chat) {
        this.socketService.socket.emit("out-chat", { chat: this.chat._id });
      }
      this.chat = null;
    });

    let state = this.router.getCurrentNavigation().extras.state;
    try {
      if (state) {
        const { chat } = state;
        this.setChat({ chat }, false);
      }
    } catch (error) {}
  }

  chat: IChat = null;

  /**
   * Variable de control para los mensajes
   */
  messages = [];

  /**
   * Selecciona un chat existente, y busca los mensajes
   * @param item
   */
  setChat(item, detect: boolean = true) {
    this.chat = null;
    this.messageService.playSound(null);
    if (this.chat) {
      this.socketService.socket.emit("out-chat", { chat: this.chat._id });
    }
    this.chat = item.chat;
  }

  newChatClose(data) {
    if (data.action == "success") {
      this.setChat(data);
    }
  }

  async newChat() {
    const modal = await this.modalCtrl.create({
      component: NewChatComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.newChatClose(data.data);
    });
    return modal.present();
  }

  ngOnInit() {
    this.chatService.getMyChats();
  }

  ionViewWillLeave() {
    this.messageService.playSound(null);
  }
}
