import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { IChat } from 'src/app/models/IChat';
import { User } from 'src/app/models/IUser';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-group-option-users',
  templateUrl: './group-option-users.component.html',
  styleUrls: ['./group-option-users.component.scss'],
})
export class GroupOptionUsersComponent implements OnInit {

  constructor(
    public userService:UserService,
    public modalCtrl:ModalController,
    public popoverCtrl:PopoverController,
    public chatService:ChatService,
    private router:Router
  ) { }

  @Input() user:User;

  @Input() admins:any[]
  ngOnInit() {
    
  }

  visit(){
    this.userService.goToProfile(this.user.username,'chat')
    this.modalCtrl.dismiss()
    this.popoverCtrl.dismiss('visit')
  }

  createChat(user){
    this.chatService.create(user._id).toPromise()
      .then((resp:IChat)=>{
          this.chatService.editedChat(resp)
          this.modalCtrl.dismiss()
          this.popoverCtrl.dismiss('chat')

      })
      .catch((err)=>{
     
        
      })
  }

  option(o){
    this.popoverCtrl.dismiss({action:o,user:this.user})
 
  }

}
