import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

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
