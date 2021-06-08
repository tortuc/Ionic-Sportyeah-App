import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/models/INotification';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'mention-notification',
  templateUrl: './mention-notification.component.html',
  styleUrls: ['./mention-notification.component.scss'],
})
export class MentionNotificationComponent implements OnInit {

  @Input() notification:INotification
  
  constructor(
    private notificationService:NotificationService
  ) {}



  ngOnInit() {}

  read(){
    if(!this.notification.read){
    this.notificationService.read(this.notification._id).toPromise()
      .then(()=>{
        this.notification.read = true
        this.notificationService.getNotificationsUnreads()
      })
      .catch((err)=>{
        // handle err
      })
  }
}
}