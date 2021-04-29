import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'new-post-header',
  templateUrl: './new-post-header.component.html',
  styleUrls: ['./new-post-header.component.scss'],
})
export class NewPostHeaderComponent implements OnInit {

  constructor(
    public userService:UserService
  ) { }

  ngOnInit() {}

}
