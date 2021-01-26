import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from 'src/app/service/follow.service';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.page.html',
  styleUrls: ['./followings.page.scss'],
})
export class FollowingsPage implements OnInit {
  user: any = null;
  followings: any;

  constructor(
    private route:ActivatedRoute,
    public userService:UserService,
    public followService:FollowService,
    private router:Router
  ) { 
    userService.getUserByUsername(route.snapshot.paramMap.get('username')).toPromise()
    .then((user:User)=>{
     this.user = user
      this.getFollows(user._id)
      
    })
    .catch((err)=>{
      this.user = 404
    })

    
  }
  goToProfile(){
    this.router.navigate([`/user/${this.user.username}`])
  }

  getFollows(id: string) {
   
    this.followService.getFollowingsById(id)
      .toPromise()
      .then((data:any)=>{
     
        
        this.followings = data.followings

      })
  }

  ngOnInit() {
  }

}
