import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'msg-user-preview',
  templateUrl: './msg-user-preview.component.html',
  styleUrls: ['./msg-user-preview.component.scss'],
})
export class MsgUserPreviewComponent implements OnInit {

  @Input() user:any

  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

}
