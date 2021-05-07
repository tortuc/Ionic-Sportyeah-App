import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import { take } from "rxjs/operators";
import { IChat } from "src/app/models/IChat";
import { ChatService } from "src/app/service/chat.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-group-name",
  templateUrl: "./group-name.component.html",
  styleUrls: ["./group-name.component.scss"],
})
export class GroupNameComponent implements OnInit {
  @Input() name: string;
  @Input() id: string;
  @Input() privacy: string;
  @Input() admins: string[];
  @ViewChild("inputName") inputName: any;
  @ViewChild("emojisContainer") emojisContainer: any;
  admin = false;
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private chatService: ChatService,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss("close");
    });
  }

  ngOnInit() {
    console.log(this.admins);
    let admin = this.admins.find((x) => x == this.userService.User._id);
    this.admin = admin ? true : false;

    window.onclick = () => {
      this.emoji = false;
    };
  }

  updateCaret(e) {
    this.caretPosition = e.target.selectionStart;
  }

  save() {
    this.chatService
      .editChat(this.id, { name: this.name, group_privacy: this.privacy })
      .pipe(take(1))
      .subscribe(
        (chat: IChat) => {
          this.chatService.editedChat(chat);
          this.modalCtrl.dismiss();
        },
        () => {}
      );
  }

  caretPosition;

  emoji = false;

  addEmoji(ev) {
    let value = this.name;
    const newText =
      value.substring(0, this.caretPosition) +
      ev.emoji.native +
      value.substring(this.caretPosition);

    this.name = newText;
  }

  openEmojis(ev) {
    ev.stopPropagation();
    this.cd.detectChanges();
    this.emoji = !this.emoji;

    this.inputName.el.onclick = function (e) {
      e.stopPropagation();
    };

    this.emojisContainer.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
  }
}
