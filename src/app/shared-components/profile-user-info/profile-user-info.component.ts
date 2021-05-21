import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/IUser';

@Component({
  selector: 'profile-user-info',
  templateUrl: './profile-user-info.component.html',
  styleUrls: ['./profile-user-info.component.scss']
})
export class ProfileUserInfoComponent implements OnInit {

  @Input() user:User;
  constructor() { }

  ngOnInit() {
  }

}
