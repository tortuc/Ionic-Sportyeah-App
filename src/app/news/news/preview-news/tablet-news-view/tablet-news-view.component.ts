import { Component, Input,OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'tablet-news-view',
  templateUrl: './tablet-news-view.component.html',
  styleUrls: ['./tablet-news-view.component.scss'],
})
export class TabletNewsViewComponent implements OnInit {

  @Input() news;
  @Input() sponsors;
  constructor(
    public userService:UserService

  ) { }

  ngOnInit() {}

}
