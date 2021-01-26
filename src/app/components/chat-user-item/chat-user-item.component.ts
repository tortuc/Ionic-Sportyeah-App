import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'chat-user-item',
  templateUrl: './chat-user-item.component.html',
  styleUrls: ['./chat-user-item.component.scss'],
})
export class ChatUserItemComponent implements OnInit {

  @Input() item:any
  @Output() selected = new EventEmitter()

  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

  setChat(item){
 
    
    this.selected.emit(item)
  }

}
