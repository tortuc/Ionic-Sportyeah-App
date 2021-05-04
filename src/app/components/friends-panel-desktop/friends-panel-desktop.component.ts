import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddFriendsPage } from 'src/app/dashboard/add-friends/add-friends.page';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'friends-panel-desktop',
  templateUrl: './friends-panel-desktop.component.html',
  styleUrls: ['./friends-panel-desktop.component.scss'],
})
export class FriendsPanelDesktopComponent implements OnInit {
  /**
   * Solo es true si esta en la pagina del post
   */
  @Input() postPage: boolean = false;

  constructor(
    public userService:UserService,
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  goToMyProfile(){
    this.router.navigate(["/profile"])
  }

  async searchFriend(){
    let modal = await this.modalController.create({
      component: AddFriendsPage,
      cssClass: 'my-custom-class'
    });
   
    return await modal.present();
  }
  segment = "followings";

  
}

