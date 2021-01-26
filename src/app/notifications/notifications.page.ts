import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from '../langs/langs.page';
import { INotification } from '../models/INotification';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    public translate:TranslateService,
    private popover:PopoverController,
    public userService:UserService,
    private notificationService:NotificationService
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      this.actualiceNotifications()
      this.ngOnInit()
    },3000)
   
  }

  notifications:INotification[] = []
  
  ionViewWillEnter(){
    this.notificationService.getNotificationsUnreads()
    this.notificationService.getNotifications().toPromise()
      .then((notifications:INotification[])=>{
        this.notifications = notifications
      })
  }

 async actualiceNotifications(){
  if(this.notifications.length == 0){
    this. ionViewWillEnter()
   }
   this.notificationService.getNotificationsUnreads()
    await this.notificationService.getNotifications().toPromise()
      .then((notifications:INotification[])=>{
        let existe = false
        notifications.forEach((visits) => {
          let id = visits._id
          for(let key in this.notifications){
            if(this.notifications[key]._id == id){existe = true}
          } 
          if(existe == false){
            this.notifications.splice(0, 0, visits);
            existe = false
          }
        });
      })  
 }

  async langs(ev){
    let langs = await this.popover.create({
      component: LangsPage,
      translucent: true,
      event:ev
  
    })
  
    langs.present()
  }

  seeAll(){
    this.notificationService.readAll().toPromise()
      .then(()=>{
        this.notificationService.getNotificationsUnreads()
        this.notifications.map((notification)=>{
          return notification.read = true
        })
      })
      .catch((err)=>{
        // handle
      })
  }
}
