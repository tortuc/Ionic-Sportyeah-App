import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  constructor(
    public newsService:NewsService,
    private route:ActivatedRoute,

  ) {
    this.newsService.findById(route.snapshot.paramMap.get('id')).toPromise()
    .then((response:any)=>{
      this.news = response 
    })
    .catch((err)=>{
      this.news = 404
    })
    /* .subscribe((response:any)=>{
      console.log(response)
      this.new = response
      this.news = response.news */
    }
   
news = undefined;
item = undefined;
  ngOnInit() {
  }

  comments($event){
    this.news.comments = $event
  }

}
