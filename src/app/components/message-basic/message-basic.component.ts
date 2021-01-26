import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { IonCard, ModalController, PopoverController } from "@ionic/angular";
import { ImageComponent } from 'src/app/chat/image/image.component';
import { OptionsMsgComponent } from "src/app/chat/options-msg/options-msg.component";
import { IMessage } from "src/app/models/IChat";
import { MessageService } from "src/app/service/message.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "message-basic",
  templateUrl: "./message-basic.component.html",
  styleUrls: ["./message-basic.component.scss"]
 
})
export class MessageBasicComponent implements OnInit,AfterViewInit {
  @Input() message: IMessage;
  @ViewChild('content') element:IonCard
  constructor(
    public  userService     : UserService,
    private popover         : PopoverController,
    private messageService  : MessageService,
    private modalCtrl       : ModalController
  ) {}

  ngOnInit() {
    
  }

  @Output() load = new EventEmitter()

  async ngAfterViewInit(){
   
    this.load.emit(true)

    
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

  async openImg() {
    let modal = await this.modalCtrl.create({
      component: ImageComponent,
      componentProps: { msg:this.message },
    });

    return modal.present();
  }
}
