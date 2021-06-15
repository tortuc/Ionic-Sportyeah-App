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

  stream = []; //Contiene todas los streaming
  news = [];  //Contiene todas las noticias
  // newsFollow = []; //Contiene las noticias de los seguidos
  // newsFollowthree = []; //Contiene las 3 ultimas noticias de los seguidos
  // newsSportUser = []; //Contiene las noticias del deporte del usuario
  myNews = []; // Contiene las noticias del reportero en caso de ser user press
  indexLast = 3;
   verMasSport(){
       this.indexLast += 10 
   }
  indexLastFollow = 3;
   verMasfollow(){
    this.indexLastFollow += 10 
   }
   indexLastMy = 3;
   verMasMy(){
    this.indexLastMy += 10 
   }
   indexStreaming = 3;
   verMasStreaming(){
    this.indexStreaming += 10 
   }
  
  ngOnInit() {
    this.newsService.find().subscribe((response:any)=>{
      this.news = response
      console.log(this.news);
      
    })
    this.newsService.findUserNews(this.userService.User._id).subscribe((response:any)=>{
      this.myNews = response;
    })
    this.newsService.findStreaming().subscribe((response:any)=>{
      this.stream = response;
    })
  }
  OpenNews(idNews){
    this.router.navigate([`news/read/${idNews}`])
  }
  goToStream(postStream,idNews){
    this.newsService.idNews = idNews
    this.router.navigate([`/news/streamNews/${postStream}`])
  }
  
}
