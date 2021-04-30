import { Component, Input, OnInit } from '@angular/core';
// import { User } from 'src/app/models/IUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-item-visit',
  templateUrl: './user-item-visit.component.html',
  styleUrls: ['./user-item-visit.component.scss'],
})
export class UserItemVisitComponent implements OnInit {

  // @Input() user:User;

  @Input() date:string;

  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

}
