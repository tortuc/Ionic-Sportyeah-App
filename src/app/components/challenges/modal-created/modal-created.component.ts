import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { IChallenge } from "./../../../service/challenge.service";
import { UserService } from "./../../../service/user.service";
import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MessageService } from "src/app/service/message.service";
import { ChatService } from "src/app/service/chat.service";
import { take } from "rxjs/operators";
import { User } from "src/app/models/IUser";

@Component({
  selector: "app-modal-created",
  templateUrl: "./modal-created.component.html",
  styleUrls: ["./modal-created.component.scss"],
})
export class ModalCreatedComponent implements OnInit {
  @Input() Challenge: IChallenge;
  challengeLink: string =
    "https://localhost:8100/challenge/abcjiajkasjdufeiwrjqr";
  users: any[] = null;
  name: string = "";

  constructor(
    public userService: UserService,
    public toast: ToastController,
    public mc: ModalController,
    public messageService: MessageService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    this.users = this.userService.followings;
    this.challengeLink = `${environment.URL_FRONT}challenge/${this.userService.User.username}/${this.Challenge._id}`;
  }

  onChange(search) {
    this.users = this.userService.followings;
    this.users = this.users.filter(
      (user: any) => JSON.stringify(user).indexOf(search) !== -1
    );
  }
  async copyLink() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.challengeLink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    const toast = await this.toast.create({
      message: "Copiado",
      cssClass: "centerToast",
      duration: 2000,
    });
    await toast.present();
  }

  async challengePerson(user: User) {
    const toast = await this.toast.create({
      message: "Mensaje Enviado",
      cssClass: "centerToast",
      duration: 2000,
    });
    await toast.present();

    this.chatService
      .create(user._id)
      .pipe(take(1))
      .subscribe((r: any) => {
        const message = {
          user: this.userService.User._id,
          message: `¡Hey, te reto a realizar este increíble desafío! 
https://app.sportyeah.com/challenge/${this.userService.User.username}/${this.Challenge._id}`,
          image: ``,
          document: null,
          chat: r._id,
        };
        this.messageService.newMessage(message);
      });
  }
}
