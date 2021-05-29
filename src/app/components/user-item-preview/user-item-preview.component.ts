import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/IUser';

@Component({
  selector: 'user-item-preview',
  templateUrl: './user-item-preview.component.html',
  styleUrls: ['./user-item-preview.component.scss'],
})
export class UserItemPreviewComponent implements OnInit {
  
  @Input() user: User;
  constructor() { }

  ngOnInit() {}

}
