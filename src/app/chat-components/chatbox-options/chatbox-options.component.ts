import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ChatService } from "../../service/chat.service";
import { IChat } from "../../models/IChat";

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
    private chatService: ChatService
  ) {}

  async ngOnInit() {
    this.chatService
      .verifyIfUserIsAdminOfGroup(this.chat._id)
      .toPromise()
      .then((data: IChat) => {
        if (data.admins.length > 0) this.admin = true;
      })
      .catch((e) => {
        // Handle Catch
      });
  }

  option(o) {
    this.popover.dismiss(o);
  }
}
