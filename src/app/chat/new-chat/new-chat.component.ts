import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    public userService:UserService,
    public chatService:ChatService
  ) { }

  ngOnInit() {
  }

  createChat(user){
    this.chatService.create(user._id).toPromise()
      .then((resp)=>{
        this.modalCtrl.dismiss({
          action:'success',
          chat:resp
        })
      })
      .catch((err)=>{
        
      })
  }

  dismiss(){
    this.modalCtrl.dismiss({
      action:'close'
    })
  }
}
