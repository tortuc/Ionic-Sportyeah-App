import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewPostPage } from 'src/app/dashboard/new-post/new-post.page';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'main-card-user',
  templateUrl: './main-card-user.component.html',
  styleUrls: ['./main-card-user.component.scss'],
})
export class MainCardUserComponent implements OnInit {

  @Input() profile:boolean = false
  constructor(
    public userService:UserService,
    public router:Router,
    public modalController:ModalController
  ) { }

  ngOnInit() {}

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }


  open = false;
  async newPost() {
    if (!this.open) {
      this.open = true;
      const modal = await this.modalController.create({
        component: NewPostPage,
        backdropDismiss: false,
      });
      modal.onDidDismiss().then((data) => {
        this.open = false;
        // this.modalClose(data);
      });
      return modal.present();
    }
  }

}
