import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { NewsService } from '../../service/news.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
  ) { }


  news = [];  //Contiene todas las noticias
  newsFollow = []; //Contiene las noticias de los seguidos
  newsFollowthree = []; //Contiene las 3 ultimas noticias de los seguidos
  newsSportUser = []; //Contiene las noticias del deporte del usuario
  myNews = []; // Contiene las noticias del reportero en caso de ser user press
  indexLast = 3;
   verMasSport(){
       this.indexLast += 3 
   }
  indexLastFollow = 3;
   verMasfollow(){
    this.indexLastFollow += 3 
   }
   indexLastMy = 3;
   verMasMy(){
    this.indexLastMy += 3 
   }
  
  ngOnInit() {
    this.newsService.find().subscribe((response:any)=>{
      this.news = response;
      response.forEach((news)=>{
        let noticia = news.user._id
        for(let user of this.userService.followings){
          if(noticia == user.user._id ){
            this.newsFollow.push(news)
            if(this.newsFollowthree.length < 3){
              this.newsFollowthree.push(news)
            }
          } 
        }
        if(news.sport == this.userService.User.sport){
          this.newsSportUser.push(news)
        }
        if(news.user._id == this.userService.User._id){
          this.myNews.push(news);
        }
      })
      this.newsFollow.splice(0,3)
    
    })
  }
  OpenNews(idNews){
    this.router.navigate([`news/read/${idNews}`])
  }

  
}
