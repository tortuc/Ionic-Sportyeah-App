import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost,INew } from 'src/app/models/iPost';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'post-shared',
  templateUrl: './post-shared.component.html',
  styleUrls: ['./post-shared.component.scss'],
})
export class PostSharedComponent implements OnInit {

  constructor(
    public userService:UserService,
    private router:Router,
    public newsService:NewsService,
  ) { }

  @Input() post:IPost
  @Input() news: INew
  @Input() disabled:boolean = false
  ngOnInit() {
  }

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
  
  OpenNews(){
    this.newsService.openNews = this.news._id
    this.router.navigate([`news/read/${this.news._id}`])
  }

}
