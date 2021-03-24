import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'button-notification',
  templateUrl: './button-notification.component.html',
  styleUrls: ['./button-notification.component.scss'],
})
export class ButtonNotificationComponent implements OnInit {

  constructor(
    public notificationService:NotificationService
  ) { }

  ngOnInit() {}

}
