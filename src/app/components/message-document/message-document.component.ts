import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../models/IChat';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'message-document',
  templateUrl: './message-document.component.html',
  styleUrls: ['./message-document.component.scss'],
})
export class MessageDocumentComponent implements OnInit {


  @Input() message:IMessage

  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

  downloadDoc(url){
    window.location.href = url;
  }
}
