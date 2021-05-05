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

@Component({
  selector: "app-group-name",
  templateUrl: "./group-name.component.html",
  styleUrls: ["./group-name.component.scss"],
})
export class GroupNameComponent implements OnInit {
  @Input() name: string;
  @Input() id: string;
  @Input() privacy: string;
  @ViewChild("inputName") inputName: any;
  @ViewChild("emojisContainer") emojisContainer: any;
  admin = false;
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private chatService: ChatService,
    private cd: ChangeDetectorRef
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss("close");
    });
  }

  ngOnInit() {
    this.chatService
      .verifyIfUserIsAdminOfGroup(this.id)
      .toPromise()
      .then((resp: any) => {
        if (resp.admins.length > 0) this.admin = true;
      });

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
