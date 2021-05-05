import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import {
  IonCardContent,
  LoadingController,
  ModalController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IChat } from "../models/IChat";
import { ChatService } from "../service/chat.service";
import { MessageService } from "../service/message.service";
import { UserService } from "../service/user.service";
import { NewChatComponent } from "./new-chat/new-chat.component";
import { ActivatedRoute, Router } from "@angular/router";
import { SocketService } from "../service/socket.service";
import { ChatInfoGroupComponent } from "../chat-components/chat-info-group/chat-info-group.component";
import { ChatNewGroupComponent } from "../chat-components/chat-new-group/chat-new-group.component";
import { ChatOptionsComponent } from "../chat-components/chat-options/chat-options.component";
import { take } from "rxjs/operators";
import { MediaMatcher } from "@angular/cdk/layout";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  @ViewChild("chatMessage") chatContent: IonCardContent;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  activeSegment = "my_chats";

  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public chatService: ChatService,
    public messageService: MessageService,
    public translate: TranslateService,
    private socketService: SocketService,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private popover: PopoverController,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private loadingCtrl: LoadingController
  ) {
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.messageService.playSound(null);
      if (this.chat) {
        this.socketService.socket.emit("out-chat", { chat: this.chat._id });
      }
      this.chat = null;
      this.chatService.chatActived = false;
    });

    let state = this.router.getCurrentNavigation().extras.state;
    try {
      if (state) {
        const { chat } = state;

        this.setChat(chat);
      }
    } catch (error) {}

    route.queryParams.subscribe((data) => {
      if (data?.s == "g") {
        this.activeSegment = "public_groups";
        this.chatService.getPublicGroups();
      }
    });
  }

  chat: IChat = null;

  /**
   * Selecciona un chat existente, y busca los mensajes
   * @param item
   */
  setChat(chat) {
    this.messageService.playSound(null);
    if (this.chat) {
      this.socketService.socket.emit("out-chat", { chat: this.chat._id });
    }
    this.chat = null;

    this.chat = chat;
    this.chatService.chatActived = true;
  }

  newChatClose(data) {
    if (data.action == "success") {
      this.setChat(data.chat);
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
    this.userService.logoutObservable().subscribe((bool) => {
      if (bool) {
        this.chat = null;
      }
    });

    this.chatService.editedChatObservable().subscribe((chat) => {
      this.setChat(chat);
    });

    this.chatService.closeChatObservable().subscribe(() => {
      this.close();
    });
  }

  ionViewWillLeave() {
    this.messageService.playSound(null);
    this.close();
  }

  ionViewWillEnter() {
    this.checkRedirectChat();
  }
  async checkRedirectChat() {
    if (sessionStorage.getItem("chat")) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      this.chatService
        .getChatById(sessionStorage.getItem("chat"))
        .pipe(take(1))
        .subscribe(
          (chat) => {
            loading.dismiss();
            sessionStorage.removeItem("chat");

            this.setChat(chat);
          },
          (e) => {
            loading.dismiss();
            sessionStorage.removeItem("chat");

            // handle
          }
        );
    }
  }

  optionsOpen = false;
  async options(event) {
    if (!this.optionsOpen) {
      this.optionsOpen = true;
      let popover = await this.popover.create({
        component: ChatOptionsComponent,
        event,
      });
      popover.onDidDismiss().then((resp) => {
        this.optionsOpen = false;
        this.handlerOptionsChat(resp.data);
      });
      popover.present();
    }
  }
  handlerOptionsChat(data: any) {
    switch (data) {
      case "group":
        this.createGroup();
        break;
      case "chat":
        this.newChat();
        break;
      default:
        break;
    }
  }

  newGroupOpen = false;
  async createGroup() {
    if (!this.newGroupOpen) {
      this.newGroupOpen = true;
      let modal = await this.modalCtrl.create({
        component: ChatNewGroupComponent,
      });
      modal.onDidDismiss().then((data) => {
        this.newGroupOpen = false;

        if (data.data?.create) {
          this.setChat(data.data);
          this.chatService.getMyChats();
        }
      });
      modal.present();
    }
  }
  segmentChanged(e) {
    if (e.detail.value === "public_groups") this.chatService.getPublicGroups();
    this.activeSegment = e.detail.value;
  }

  async optionsChatBox(item) {
    let modal = await this.modalCtrl.create({
      component: ChatInfoGroupComponent,
      componentProps: { chat: item.chat, public_group: true },
    });

    modal.onDidDismiss().then((data) => {
      // this.option(data.data)
    });

    modal.present();
  }

  searchDelay;
  searchLoading = false;
  searchPublicGroups(query) {
    this.chatService.groups = [];
    this.searchLoading = true;
    clearTimeout(this.searchDelay);
    this.searchDelay = setTimeout(async () => {
      this.chatService.getPublicGroups(query.detail.value);
      this.searchLoading = false;
    }, 1000);
  }

  close() {
    this.cookieService.delete("chat");

    this.chat = null;
    this.chatService.chatActived = false;
  }

  ngOnDestroy() {
    this.cookieService.delete("chat");
  }
}
