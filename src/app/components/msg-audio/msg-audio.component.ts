import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from 'src/app/models/IChat';
import getBlobDuration from 'get-blob-duration'
import { UserService } from '../../service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { OptionsMsgComponent } from 'src/app/chat/options-msg/options-msg.component';
import { PopoverController } from '@ionic/angular';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'msg-audio',
  templateUrl: './msg-audio.component.html',
  styleUrls: ['./msg-audio.component.scss'],
})
export class MsgAudioComponent implements OnInit {

  constructor(
    public userService:UserService,
    private cd:ChangeDetectorRef,
    public messageService:MessageService,
    private popover:PopoverController
  ) { }



  @Input() message:IMessage
  @Output() delete = new EventEmitter()




  duration = 0
  async ngOnInit() {
    this.duration = await getBlobDuration(this.message.audio)
    
    this.audio = new Howl({
      src:[this.message.audio]
    }) 
    
    this.audio.load()    
    setInterval(() => {
      this.updateWidth(); 
    },100);
  
   
     
    this.messageService.soundPlaying().subscribe((id)=>{
      if(id != this.message._id){
        this.pause = true
        this.audio.pause()
        this.cd.detectChanges()
      }
    })
  }

updateWidth() {

    if(this.audio.playing()){
      this.currentTime = this.audio.seek() 
    }else if (!this.audio.playing() && this.currentTime > 0 && !this.pause){
      this.currentTime = 0
    }
    
    
  }

  currentTime:any = 0
  pause = false

  audio:Howl = null;
  /**
    * Esta funcion reproduce un audio
    * @param url Url del audio
    */
   playAudio(){     
     
     if(!(this.currentTime != 0 && !this.pause)){
      this.pause = false
      this.cd.detectChanges()
  
      this.messageService.playSound(this.message._id)
  
     
    
      this.audio.play()
      this.cd.detectChanges()
     }else{
       this.pauseAudio()
     }
   

}



pauseAudio(){
  this.pause = !this.pause
  this.cd.detectChanges()
  this.audio.pause()

}


async options(ev,msg){
  let popover = await this.popover.create({
    component:OptionsMsgComponent,
    componentProps:{msg},
    event:ev
  })
  popover.onDidDismiss().then((data)=>{
    this.optionsClosed(data.data)
  })
  return popover.present()
}
optionsClosed(data: any) {
switch (data?.action) {
  case "delete":
    this.deleted()
    break;

  default:
    break;
}

}
  deleted() {
    this.messageService.deleteMessage(this.message._id)
      .toPromise()
      .then(()=>{
        this.message.deleted = true
      })
      .catch((err)=>{
        // handle err
      })
  }





}
