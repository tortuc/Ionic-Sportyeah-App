import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.page.html',
  styleUrls: ['./follower.page.scss'],
})
export class FollowerPage implements OnInit {

  constructor(
    public  userService       : UserService,
    public  translate         : TranslateService,
    private router            : Router


  ) { }

  ngOnInit() {
    
  }

  goTo(r){
    this.router.navigate([r])
  }


}
