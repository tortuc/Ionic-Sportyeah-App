import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-item-reactions',
  templateUrl: './user-item-reactions.component.html',
  styleUrls: ['./user-item-reactions.component.scss'],
})
export class UserItemReactionsComponent implements OnInit {

  constructor(
    public userService:UserService,
    private modalCtrl:ModalController,
    private router:Router
  ) { }

  @Input() user:User
  @Input() type:number;
  ngOnInit() {}

  goToProfile(username) {
    if (username == this.userService.User?.username) {
      this.router.navigate(["/profile"]);
    } else {
      this.router.navigate([`/user/${username}`]);
    }
    this.modalCtrl.dismiss().catch()
  }

}
