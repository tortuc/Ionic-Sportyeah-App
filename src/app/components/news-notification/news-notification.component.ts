import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/models/INotification';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'news-notification',
  templateUrl: './news-notification.component.html',
  styleUrls: ['./news-notification.component.scss'],
})
export class NewsNotificationComponent implements OnInit {

  @Input() notification:INotification

  constructor(
    private notificationService:NotificationService,
    public userService:UserService
  ) { }

  ngOnInit() {console.log(this.notification)}

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
