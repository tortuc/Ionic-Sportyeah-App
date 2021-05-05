import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IChat } from 'src/app/models/IChat';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-pending-users',
  templateUrl: './chat-pending-users.component.html',
  styleUrls: ['./chat-pending-users.component.scss'],
})
export class ChatPendingUsersComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    public modalCtrl: ModalController
  ) { }
  @Input() chat: IChat;
  ngOnInit() {
    this.chatService.getChatById(this.chat._id).toPromise().then( ( chat: any ) => {
      this.chat = chat;
    })
  }


  handleUserRequest( action, user ) {
    this.chatService.handleGroupJoinRequest( this.chat, user, action ).toPromise().then( ( chat: any ) => {
      this.chat = chat;
    }).catch( (e) => {
      // handle catch
    })
  }

}
