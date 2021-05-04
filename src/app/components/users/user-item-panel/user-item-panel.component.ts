import { Component, Input, OnInit } from '@angular/core';
// import { User } from 'src/app/models/IUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-item-panel',
  templateUrl: './user-item-panel.component.html',
  styleUrls: ['./user-item-panel.component.scss'],
})
export class UserItemPanelComponent implements OnInit {

  @Input() user:any;
  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

}
