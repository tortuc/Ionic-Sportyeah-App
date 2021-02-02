import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../service/news.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  constructor(
    public newsService:NewsService,
  ) { }
news;

  ngOnInit() {
    this.newsService.findById(this.newsService.openNews).subscribe((response)=>{
      this.news = response
    })
  }

}
