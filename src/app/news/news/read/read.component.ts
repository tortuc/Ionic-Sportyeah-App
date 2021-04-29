import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import { UserService } from 'src/app/service/user.service';
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";

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
    private viewsSponsorService:ViewsSponsorService
  ) {
    this.idNews = route.snapshot.paramMap.get('id')
    this.getNews(this.idNews )
    }
    idNews
   async getNews(id){
    await this.newsService.findById(id).toPromise()
    .then((response:any)=>{
      console.log(response)

      this.news = response
   })
    .catch((err)=>{
      this.news = 404
    })
    this.notified = this.news.news.question? this.news.news.question.notified:undefined 
    
  }
news = undefined;
item = undefined;
notified = null

  ngOnInit() {
  }

  comments($event){
    this.news.comments = $event
  }

  goToSponsor(sponsor,id,username,post_id){
    if(id != this.userService.User._id){
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsSponsorService
          .createSponsorView(
            {
             user:resp.user._id,
             visitor:this.userService.User._id,
             from:"news",
             link:`/news/read/${post_id}`,
             urlSponsor:sponsor
           }
           )
            .subscribe((response) => {
              window.location.replace(sponsor);
            });
        })
      }
  }

  goToSponsorComment(sponsor,id,news_id){
    if(id != this.userService.User._id){
     
          this.viewsSponsorService
          .createSponsorView(
            {
             user:id,
             visitor:this.userService.User._id,
             from:"comment",
             link:`/news/read/${news_id}`,
             urlSponsor:sponsor
           }
           )
            .subscribe((response) => {
              window.location.replace(sponsor);
            });

      }
  }

  voted(voted:boolean){
    if(voted){
      this.getNews(this.idNews )
    }
  }

}
