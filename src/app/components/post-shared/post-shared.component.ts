import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/iPost';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'post-shared',
  templateUrl: './post-shared.component.html',
  styleUrls: ['./post-shared.component.scss'],
})
export class PostSharedComponent implements OnInit {

  constructor(
    public userService:UserService,
    private router:Router 
  ) { }

  @Input() post:IPost
  @Input() disabled:boolean = false
  ngOnInit() {}

  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      this.router.navigate([`/user/${username}`])
  
    }
  }

  goToPost(id){
    this.router.navigate([`/post/${id}`])
  }
  
}
