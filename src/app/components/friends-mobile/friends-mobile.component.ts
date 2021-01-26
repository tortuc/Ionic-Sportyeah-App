import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";

@Component({
  selector: 'friends-mobile',
  templateUrl: './friends-mobile.component.html',
  styleUrls: ['./friends-mobile.component.scss'],
})
export class FriendsMobileComponent implements OnInit {

  constructor(
    public userService:UserService,
    private router:Router,
    private viewsProfileService: ViewsProfileService
  ) { }

  ngOnInit() {}

  @Output() post= new EventEmitter()
  @Output() search = new EventEmitter()

  newPost(){
    this.post.emit(true)
  }

  searchFriend(){
    this.search.emit(true)
  }

  goToMyProfile(){
    this.router.navigate(["/profile"])
  }

  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
            .updateProfileView(this.userService.User._id, resp.user._id,'search',null)
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
  
    }
  }
  
}
