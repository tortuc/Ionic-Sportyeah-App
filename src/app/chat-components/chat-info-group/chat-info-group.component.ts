import { Component, Input, OnInit } from "@angular/core";
import {
  AlertController,
  ModalController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { IChat } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { UserService } from "src/app/service/user.service";
import { GroupAddUsersComponent } from "../group-add-users/group-add-users.component";
import { GroupImageComponent } from "../group-image/group-image.component";
import { GroupNameComponent } from "../group-name/group-name.component";
import { GroupOptionUsersComponent } from "../group-option-users/group-option-users.component";
import { ToastService } from "../../service/toast.service";
import { environment } from "../../../environments/environment";
import { ChatPendingUsersComponent } from "../chat-pending-users/chat-pending-users.component";
import { User } from "src/app/models/IUser";

@Component({
  selector: "app-chat-info-group",
  templateUrl: "./chat-info-group.component.html",
  styleUrls: ["./chat-info-group.component.scss"],
})
export class ChatInfoGroupComponent implements OnInit {
  @Input() chat: IChat;
  @Input() public_group = false;
  environment = environment;
  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private platform: Platform,
    private popover: PopoverController,
    private toastService: ToastService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss("close");
    });
  }

  admin = false;
  ngOnInit() {
    this.chatService
      .verifyIfUserIsAdminOfGroup(this.chat._id)
      .toPromise()
      .then((resp: any) => {
        if (resp.admins.length > 0) this.admin = true;
      });

    if (this.public_group == false) this.sortMyUser();

    this.chatService.editedChatObservable().subscribe((chat) => {
      this.chat = chat;
      if (this.public_group == false) this.sortMyUser();
    });

    if (this.public_group == true) {
      this.chatService
        .getChatById(this.chat._id)
        .toPromise()
        .then((chat: IChat) => {
          this.chat = chat;
        });
    }
  }

  sortMyUser() {
    this.chat.users = this.chat.users.filter((user) => {
      return user._id != this.userService.User._id;
    });
    this.chat.users.unshift(this.userService.User);
  }

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
                  this.modalCtrl.dismiss();
                },
                (err) => {
                  // handle
                }
              );
            if (this.chat.group_privacy === "public")
              this.chatService.getPublicGroups();
            this.toastService.presentToast("Has abandonado el grupo");
          },
        },
      ],
    });
    alert.present();
  }

  async seeImage(inChat = true) {
    let imageModal = await this.modalCtrl.create({
      component: GroupImageComponent,
      componentProps: { image: this.chat.image, id: this.chat._id, inChat },
    });
    imageModal.present();
  }

  async editName() {
    let nameModal = await this.modalCtrl.create({
      component: GroupNameComponent,
      componentProps: {
        name: this.chat.name,
        id: this.chat._id,
        privacy: this.chat.group_privacy,
      },
      cssClass: "modal-little",
    });
    nameModal.present();
  }
  async addUsers() {
    let addUsersModal = await this.modalCtrl.create({
      component: GroupAddUsersComponent,
      componentProps: { usersIn: this.chat.users, id: this.chat._id },
    });
    addUsersModal.present();
  }

  async optionUser(user: User, ev) {
    if (user._id != this.userService.User._id) {
      let popover = await this.popover.create({
        component: GroupOptionUsersComponent,
        componentProps: { user, admins: this.chat.admins },
        event: ev,
      });
      popover.onDidDismiss().then((resp) => {
        this.handlerPopover(resp.data);
      });
      popover.present();
    }
  }
  handlerPopover(data: any) {
    switch (data?.action) {
      case "kick":
        this.kickUser(data?.user);
        break;

      case "admin":
        this.makeAdmin(data?.user);
        break;
      case "discard_admin":
        this.discardAdmin(data?.user);
        break;

      default:
        break;
    }
  }
  discardAdmin(user: any) {
    this.chatService
      .discardAdmin(this.chat._id, user._id)
      .pipe(take(1))
      .subscribe((chat: IChat) => {
        this.chatService.editedChat(chat);
      });
  }

  async kickUser(user: any) {
    let kickAlert = await this.alertCtrl.create({
      header: this.translate.instant("chat.group.kick.header"),
      message: this.translate.instant("chat.group.kick.message", user),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.chatService
              .kickUSer(this.chat._id, user._id)
              .pipe(take(1))
              .subscribe((chat: IChat) => {
                this.chatService.editedChat(chat);
              });
          },
        },
      ],
    });
    kickAlert.present();
  }
  async makeAdmin(user: any) {
    this.chatService
      .makeAdmin(this.chat._id, user._id)
      .pipe(take(1))
      .subscribe((chat: IChat) => {
        this.chatService.editedChat(chat);
      });
  }

  join() {
    this.chatService
      .addusers(this.chat._id, [this.userService.User])
      .toPromise()
      .then(() => {
        this.chatService.getMyChats();
        this.chatService.getPublicGroups();
        this.modalCtrl.dismiss();
        this.toastService.presentToast(
          this.translate.instant("joined_group", this.chat)
        );
      });
  }

  notifyTextCopied() {
    this.toastService.presentToast(
      this.translate.instant(this.translate.instant("group_link_copied"))
    );
  }

  async pendingUsers() {
    let modal = await this.modalCtrl.create({
      component: ChatPendingUsersComponent,
      componentProps: { chat: this.chat },
    });

    modal.present();
  }
}
