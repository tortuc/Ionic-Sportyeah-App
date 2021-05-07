import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ChatService } from "../../service/chat.service";
import { IChat } from "../../models/IChat";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-chatbox-options",
  templateUrl: "./chatbox-options.component.html",
  styleUrls: ["./chatbox-options.component.scss"],
})
export class ChatboxOptionsComponent implements OnInit {
  @Input() group: boolean;
  @Input() chat: IChat;
  admin = false;
  constructor(
    public popover: PopoverController,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    let admin = this.chat.admins.find((x) => x == this.userService.User._id);
    this.admin = admin ? true : false;
  }

  option(o) {
    this.popover.dismiss(o);
  }
}
