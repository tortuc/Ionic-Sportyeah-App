import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'mobile-news-view',
  templateUrl: './mobile-news-view.component.html',
  styleUrls: ['./mobile-news-view.component.scss'],
})
export class MobileNewsViewComponent implements OnInit {

  @Input() news;
  @Input() sponsors;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {}

}
