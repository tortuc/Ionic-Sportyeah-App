import { Component, Input, OnInit } from '@angular/core';
import { IChat } from 'src/app/models/IChat';
import { User } from 'src/app/models/IUser';

@Component({
  selector: 'chat-empty',
  templateUrl: './chat-empty.component.html',
  styleUrls: ['./chat-empty.component.scss'],
})
export class ChatEmptyComponent implements OnInit {

  @Input() friend:User;
  @Input() chat:IChat;

  constructor() { }

  ngOnInit() {}

}
