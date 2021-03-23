import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/models/INotification';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'unfollow-notification',
  templateUrl: './unfollow-notification.component.html',
  styleUrls: ['./unfollow-notification.component.scss'],
})
export class UnfollowNotificationComponent implements OnInit {
  @Input() notification:INotification
  
  constructor(
    private notificationService:NotificationService,
    public userService:UserService
  ) { }

  ngOnInit() {}

  read(){
    if(!this.notification.read){

    }this.notificationService.read(this.notification._id).toPromise()
    .then(()=>{
      this.notification.read = true
      this.notificationService.getNotificationsUnreads()
    })
    .catch((err)=>{
      // handle err
    })
}
    
}
