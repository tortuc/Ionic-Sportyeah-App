import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/models/INotification';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'comment-notification',
  templateUrl: './comment-notification.component.html',
  styleUrls: ['./comment-notification.component.scss'],
})
export class CommentNotificationComponent implements OnInit {
  @Input() notification:INotification

  constructor(
    private notificationService:NotificationService,
    public userService:UserService
  ) { 

  

  }



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
