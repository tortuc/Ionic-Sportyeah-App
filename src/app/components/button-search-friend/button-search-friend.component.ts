import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddFriendsPage } from 'src/app/dashboard/add-friends/add-friends.page';

@Component({
  selector: 'button-search-friend',
  templateUrl: './button-search-friend.component.html',
  styleUrls: ['./button-search-friend.component.scss'],
})
export class ButtonSearchFriendComponent implements OnInit {

  constructor(
    private modalController:ModalController

  ) { }

  ngOnInit() {}


  async searchFriend(){
      let modal = await this.modalController.create({
        component: AddFriendsPage,
        cssClass: 'my-custom-class'
      });
     
      return await modal.present();
    }
   

}
