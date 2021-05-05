import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { IChat } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { MessageService } from "src/app/service/message.service";
import { ToastService } from "src/app/service/toast.service";
import { UserService } from "src/app/service/user.service";
import { ChatInfoGroupComponent } from "../chat-info-group/chat-info-group.component";
import { ChatPendingUsersComponent } from "../chat-pending-users/chat-pending-users.component";
import { ChatboxOptionsComponent } from "../chatbox-options/chatbox-options.component";

@Component({
  selector: "chat-header",
  templateUrl: "./chat-header.component.html",
  styleUrls: ["./chat-header.component.scss"],
})
export class ChatHeaderComponent implements OnInit {
  @Input() chat: IChat;
  @Input() landing: boolean = false;
  @Output() clean = new EventEmitter<string>();
  constructor(
    public userService: UserService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public router: Router,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private chatService: ChatService,
    private toastService: ToastService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  async optionsChatBox(ev) {
    let modal = await this.popoverCtrl.create({
      component: ChatboxOptionsComponent,
      componentProps: { group: this.chat.group, chat: this.chat },
      event: ev,
    });

    modal.onDidDismiss().then((resp) => {
      switch (resp.data) {
        case "info_group":
          this.infoGroup();

          break;
        case "profile":
          this.seeProfile();

          break;
        case "pending_users":
          this.pendingUsers();
          break;
        case "leave":
          this.leave();
          break;
        case "clear":
          this.clearChat();
          break;

        default:
          break;
      }
    });
    modal.present();
  }

  /**
   * Ver la informacion de un chat grupal
   */
  async infoGroup() {
    let modal = await this.modalCtrl.create({
      component: ChatInfoGroupComponent,
      componentProps: { chat: this.chat },
    });

    modal.onDidDismiss().then((data) => {
    });

    modal.present();
  }

  /**
   * Visitar el perfil de un usuario, en un chat
   */

  seeProfile() {
    if (this.chat.sender._id != this.userService.User._id) {
      this.router.navigate([`/user/${this.chat.sender.username}`]);
    } else {
      this.router.navigate([`/user/${this.chat.receiver.username}`]);
    }
  }

  /**
   * Ver los usuarios pendientes de un chat
   */

  async pendingUsers() {
    let modal = await this.modalCtrl.create({
      component: ChatPendingUsersComponent,
      componentProps: { chat: this.chat },
    });

    modal.onDidDismiss().then((data) => {});

    modal.present();
  }

  /**
   * Abandonar chat grupal
   */

  async leave() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("chat.group.leave.header"),
      message: this.translate.instant("chat.group.leave.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.chatService
              .leaveChat(this.chat._id)
              .pipe(take(1))
              .subscribe(
                (resp) => {
                  this.chatService.getMyChats();
                  this.chatService.closeChat();
                  this.chatService.getPublicGroups();
                  this.toastService.presentToast(
                    this.translate.instant("left_group")
                  );
                },
                (err) => {
                  // handle
                }
              );
          },
        },
      ],
    });
    alert.present();
  }

  closeChat(){
    this.chatService.closeChat();

  }

  /**
   * Borrar los mensajes de un chat
   */
  async clearChat() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("chat.clear.header"),
      message: this.translate.instant("chat.clear.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.messageService
              .clearChat(this.chat._id)
              .pipe(take(1))
              .subscribe(
                (resp) => {
                  this.clean.emit();
                },
                (err) => {
                  // handle
                }
              );
          },
        },
      ],
    });
    alert.present();
  }
}
