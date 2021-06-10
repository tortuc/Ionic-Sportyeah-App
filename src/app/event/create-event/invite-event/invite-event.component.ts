import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventAddUserComponent } from '../event-add-user/event-add-user.component';
import { SeeAllUsersLandingComponent } from '../see-all-users-landing/see-all-users-landing.component';

@Component({
  selector: 'invite-event',
  templateUrl: './invite-event.component.html',
  styleUrls: ['./invite-event.component.scss'],
})
export class InviteEventComponent implements OnInit {
   
  @Output() addUser = new EventEmitter();
  event
  users = []
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async addFriendsModal(){
    let modal = await this.modalController.create({
      component:EventAddUserComponent,
      componentProps:{usersSelect:[]}
    })
    modal.onDidDismiss().then((data)=>{
      if(data.data?.action == 'add'){//REVISA ESTO
        // this.landingService.inviteKecukiusers(data.data.users,this.event._id,this.userService.User._id).toPromise()
        this.users = data.data.users
        this.addUser.emit(data.data.users)
      }
      
    })
    modal.present()
  }

  async seeAllusers(){
    let modal = await this.modalController.create({
      component:SeeAllUsersLandingComponent,
      componentProps:{
        users:this.users,
        // event:this.event,
        // blockeds:this.event.blockeds
      }
    })
    modal.onDidDismiss().then(()=>{
      // this.reload.emit(true)
    })
    modal.present()
  }





}
