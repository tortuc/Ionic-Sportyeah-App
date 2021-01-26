import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChat } from 'src/app/models/IChat';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {

  @Input() chat:IChat

  @Output() close = new EventEmitter()
  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

  closeChat(){
    this.close.emit(true)
  }
}
