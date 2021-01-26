import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/models/IChat';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'message-deleted',
  templateUrl: './message-deleted.component.html',
  styleUrls: ['./message-deleted.component.scss'],
})
export class MessageDeletedComponent implements OnInit {

  @Input() message:IMessage
  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

}
