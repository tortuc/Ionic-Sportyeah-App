import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  constructor(
    public newsService:NewsService,
    private route:ActivatedRoute,
    public questionService:QuestionService,
    public userService:UserService,

  ) {
    this.idNews = route.snapshot.paramMap.get('id')
    this.getNews(this.idNews )
    }
    idNews
   async getNews(id){
    await this.newsService.findById(id).toPromise()
    .then((response:any)=>{
      this.news = response
   })
    .catch((err)=>{
      this.news = 404
    })
    this.notified = this.news.news.question? this.news.news.question.notified:undefined 
    console.log(this.news);
    
  }
news = undefined;
item = undefined;
notified = null

  ngOnInit() {
  }

  comments($event){
    this.news.comments = $event
  }
 /*  selectAnswer(id){
    if(this.userService.User != undefined){
      this.questionService.voteAnswer(id,this.userService.User._id).subscribe(()=>{
        this.getNews(this.idNews )
      })
    }
  } */

  voted(voted:boolean){
    if(voted){
      this.getNews(this.idNews )
    }
  }

}
