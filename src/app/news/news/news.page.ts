import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { NewsService } from '../../service/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    public newsService:NewsService,
    private router:Router,

  ) { }


  news= [];
  ngOnInit() {
    this.newsService.find().subscribe((response:any)=>{
      this.news = response;
    })
  }
  OpenNews(idNews){
    this.newsService.openNews = idNews
    this.router.navigate([`news/read/${idNews}`])
  }

  
}
