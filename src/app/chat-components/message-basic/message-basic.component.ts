import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { OptionsMsgComponent } from "src/app/chat/options-msg/options-msg.component";
import { IMessage } from "src/app/models/IChat";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service";
import { WishService } from "src/app/service/wish.service";

@Component({
  selector: "message-basic",
  templateUrl: "./message-basic.component.html",
  styleUrls: ["./message-basic.component.scss"],
})
export class MessageBasicComponent implements OnInit, AfterViewInit {
  @Input() message: IMessage;
  @Input() landing: boolean = false;
  constructor(
    public userService: UserService,
    private popover: PopoverController,
    private messageService: MessageService,
    private wishService: WishService
  ) {}

  ngOnInit() {
    this.previewUrl();
  }

  @Output() load = new EventEmitter();

  async ngAfterViewInit() {
    this.load.emit(true);
  }

  async options(ev, msg) {
    let popover = await this.popover.create({
      component: OptionsMsgComponent,
      componentProps: { msg },
      event: ev,
    });
    popover.onDidDismiss().then((data) => {
      this.optionsClosed(data.data);
    });
    return popover.present();
  }
  optionsClosed(data: any) {
    switch (data?.action) {
      case "delete":
        this.deleteOne(this.message._id);
        break;

      default:
        break;
    }
  }

  deleteOne(id) {
    this.messageService
      .deleteMessage(id)
      .toPromise()
      .then((r) => {
        this.message.deleted = true;
      })
      .catch((err) => {
        //handle err
      });
  }

  preview = null;
  previewUrl() {
    try {
      let string: string = this.message.message;
      let match = string.match(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
      );

      if (match) {
        this.wishService
          .pageInfo(match[0])
          .toPromise()
          .then((info) => {
            this.preview = info;
          })
          .catch((err) => {
            this.preview = null;
          });
      } else {
        this.preview = null;
      }
    } catch (error) {
      // nothing to do
    }
  }
}
