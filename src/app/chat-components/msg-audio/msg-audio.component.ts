import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IMessage } from "src/app/models/IChat";
import getBlobDuration from "get-blob-duration";
import { UserService } from "../../service/user.service";
import { MessageService } from "src/app/service/message.service";
import { PopoverController } from "@ionic/angular";
import { Howl } from "howler";
import { OptionsMsgComponent } from "src/app/chat/options-msg/options-msg.component";

@Component({
  selector: "msg-audio",
  templateUrl: "./msg-audio.component.html",
  styleUrls: ["./msg-audio.component.scss"],
})
export class MsgAudioComponent implements OnInit {
  interval: NodeJS.Timeout;
  constructor(
    public userService: UserService,
    private cd: ChangeDetectorRef,
    public messageService: MessageService,
    private popover: PopoverController
  ) {}

  @Input() message: IMessage;
  @Input() onlyAudio: boolean = false;
  @Output() delete = new EventEmitter();

  duration = 0;

  loaded = false;
  async ngOnInit() {
    this.audio = new Howl({
      src: [this.message.audio],
    });
    this.audio.load();

    this.audio.on("load", (ev) => {
      this.loaded = true;
      this.getDuration();
    });

    if (this.audio.state() == "loaded") {
      this.loaded = true;
      this.getDuration();
    }

    this.messageService.soundPlaying().subscribe((id) => {
      if (id != this.message._id) {
        this.pauseAudio();
      }
    });
  }

  getDuration() {
    this.duration = this.audio.duration();
  }

  updateWidth() {
    if (this.audio.playing()) {
      this.currentTime = this.audio.seek();
    } else if (!this.audio.playing() && this.currentTime > 0 && !this.pause) {
      this.currentTime = 0;
    }
  }

  currentTime: any = 0;
  pause = false;

  /**
   * Id del audio
   */

  id: number;

  audio: Howl = null;
  /**
   * Esta funcion reproduce un audio
   * @param url Url del audio
   */

  playAudio() {
    if (!(this.currentTime != 0 && !this.pause)) {
      this.pause = false;
      this.cd.detectChanges();

      this.messageService.playSound(this.message?._id);

      this.id = this.audio.play();

      this.cd.detectChanges();
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.updateWidth();
        }, 100);
      }
    } else {
      this.pauseAudio();
    }
  }

  pauseAudio() {
    clearInterval(this.interval);
    this.interval = null;

    this.pause = true;
    this.cd.detectChanges();
    this.audio.pause();
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
        this.deleted();
        break;

      default:
        break;
    }
  }

  changeRange(ev) {
    if (!this.id) {
      this.id = this.audio.play();
      this.audio.pause();
      let pos = this.audio.duration(this.id) * Number(ev.target.value);
      this.audio.seek(pos, this.id);
      this.currentTime = this.audio.seek();
    } else {
      let pos = this.audio.duration(this.id) * Number(ev.target.value);

      this.audio.seek(pos, this.id);
    }
  }
  deleted() {
    this.messageService
      .deleteMessage(this.message._id)
      .toPromise()
      .then(() => {
        this.message.deleted = true;
      })
      .catch((err) => {
        // handle err
      });
  }
}
