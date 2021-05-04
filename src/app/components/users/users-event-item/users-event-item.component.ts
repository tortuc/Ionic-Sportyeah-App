import { Component, Input, OnInit } from '@angular/core';
// import { User } from 'src/app/models/IUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'users-event-item',
  templateUrl: './users-event-item.component.html',
  styleUrls: ['./users-event-item.component.scss'],
})
export class UsersEventItemComponent implements OnInit {

  // @Input() user: User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {}

}
