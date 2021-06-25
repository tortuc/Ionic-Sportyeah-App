import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'monitor-news-view',
  templateUrl: './monitor-news-view.component.html',
  styleUrls: ['./monitor-news-view.component.scss'],
})
export class MonitorNewsViewComponent implements OnInit {

  @Input() news;
  @Input() sponsors;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {}

}
