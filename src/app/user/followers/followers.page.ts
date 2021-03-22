import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from 'src/app/service/follow.service';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {
  user: any = null;
  followers: any;

  constructor(
    private route:ActivatedRoute,
    public userService:UserService,
    public followService:FollowService,
    private router:Router
  ) { 

    
  }

  ngOnInit() {
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('username')).toPromise()
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
    this.followService.getFollowersById(id)
      .toPromise()
      .then((data:any)=>{
        this.followers = data.followers
      })
 
  }

}
