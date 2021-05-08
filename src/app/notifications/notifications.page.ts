import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from '../langs/langs.page';
import { INotification } from '../models/INotification';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { SocketService } from 'src/app/service/socket.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  @ViewChild('colNotification') notificationsContent:ElementRef
  loadingContent: boolean = false;


  constructor(
    public translate:TranslateService,
    private popover:PopoverController,
    public userService:UserService,
    private notificationService:NotificationService,
    private socketService:SocketService,
  ) { }

  ngOnInit() {
    // setTimeout(()=>{
    //   this.actualiceNotifications()
    //   this.ngOnInit()
    // },3000)
    this.socketService.socket.on('notification',()=>{      
      // si hay una notificacion buscamos la ultima en la base de dato
        this.notificationService.getNotifications(0).pipe(take(1))
        .subscribe((data)=>{
          this.notifications.unshift(data[0])
        })
    })
  }

  notifications:INotification[] = []
  
  async logScrolling(ev){
    
    let el = await ev.target.getScrollElement()
     if((el.scrollHeight - el.scrollTop < el.clientHeight + 400) && !this.loadingContent){
       this.getNotifications()
     }
   }

  ionViewWillEnter(){
    this.getNotifications()
  }

  reload(event){
    this.skip = 0
    this.notifications = []
    this.getNotifications(event)
  }

  skip = 0

  async getNotifications(event = null){
    this.loadingContent = true
    this.notificationService.getNotificationsUnreads()
    this.notificationService.getNotifications(this.skip).toPromise()
      .then((notifications:INotification[])=>{
        this.notifications = this.notifications.concat(notifications) 
        this.skip += 15
        this.loadingContent = false
        if (event) {
          event.target.complete();
        }
      })
      .catch(()=>{
        this.loadingContent = false
      })
  }

//  async actualiceNotifications(){
//   if(this.notifications.length == 0){
//     this. ionViewWillEnter()
//    }
//    this.notificationService.getNotificationsUnreads()
//     await this.notificationService.getNotifications(this.skip).toPromise()
//       .then((notifications:INotification[])=>{
//         let existe = false
//         notifications.forEach((visits) => {
//           let id = visits._id
//           for(let key in this.notifications){
//             if(this.notifications[key]._id == id){existe = true}
//           } 
//           if(existe == false){
//             this.notifications.splice(0, 0, visits);
//             existe = false
//           }
//         });
//       })  
//  }

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
