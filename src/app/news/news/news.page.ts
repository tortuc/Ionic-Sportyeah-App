import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { response } from 'express';
import { NewsService } from '../../service/news.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { IonContent } from '@ionic/angular';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  public loadingNews: boolean;
  @ViewChild("reloadButton", { static: false }) reloadButton: any;
  @ViewChild("content", { static: false }) content: IonContent;

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
    public cd: ChangeDetectorRef,
  ) { }

  stream = []; //Contiene todas los streaming
  news = [];  //Contiene todas las noticias
  allNews = []
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
   verMas(){
    this.indexLastMy += 3 
   }
   indexStreaming = 3;
   verMasStreaming(){
    this.indexStreaming += 10 
   }
  
  ngOnInit() {
    this.newsService.find({skip: this.skipNews})
    .pipe(take(1))
    .subscribe((response:any)=>{
      this.allNews = response;
      this.news = response;
      this.skipNews += 3;
    })
    this.newsService.findUserNews(this.userService.User._id,this.skipMy)
    .pipe(take(1))
    .subscribe((response:any)=>{
      this.myNews = response;
      this.skipMy += 3;
    })
    this.newsService.findStreaming({skip: this.skipStreaming})
    .pipe(take(1))
    .subscribe((response:any)=>{
      this.stream = response;
      this.skipStreaming += 3;
    })
  }
  OpenNews(idNews){
    this.router.navigate([`news/read/${idNews}`])
  }
  goToStream(postStream,idNews){
    this.newsService.idNews = idNews
    this.router.navigate([`/news/streamNews/${postStream}`])
  }
  
segment = "last"
  segmentChanged(e: CustomEvent) {
    
    if (e.detail.value == "last") {
      this.news = this.allNews
      this.segment = e.detail.value
    } else if(e.detail.value == "live"){
      this.news = this.stream
      this.segment = e.detail.value
    }else{
      this.news = this.myNews
      this.segment = e.detail.value
    }
  }

  /**
   * Esta funcion se llama cuando el usuario baja el scroll, y si llega muy abajo, entonces se llaman mas noticias automaticamente
   * @param ev
   */
   async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();
    if (el.clientHeight * 0.4 < el.scrollTop) {
      setTimeout(() => {
        this.reloadButton?.el.classList.add(
          "floating-reload",
          "scale-in-center"
        );
      }, 100);
    } else {
      this.reloadButton?.el.classList.remove(
        "scale-in-center",
        "floating-reload"
      );
    }

    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingNews
    ) {
      this.getNews();
    }
  }

  // ionViewWillEnter() {
  //   if (this.news.length == 0) {
  //     this.getNews(null, true);
  //   }
  // }

  all: boolean;
  skipNews = 0;
  skipStreaming = 0;
  skipMy = 0;

  daysBefore = 7;
  getNews(event = null, newPosts = false){
    if (newPosts) {
      this.skipNews = 0;
      this.skipStreaming = 0;
      this.skipMy = 0;
      this.news = [];
      this.allNews = [];
      this.stream = [];
      this.myNews = [];
      this.all = false;
      this.scrollTop();
    }
    if(!this.all){
      switch (this.segment) {
        case 'last':
          this.newsService.find({skip:this.skipNews})
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.allNews = this.allNews.concat(news)
            this.news = this.allNews;
            if(news.length > 0){
              this.skipNews += 3;
            }
          })
          break;
      
        case 'live':
          this.newsService.findStreaming({skip: this.skipStreaming})
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.stream  = this.stream.concat(news)
            this.news = this.stream;
            if(news.length > 0){
              this.skipStreaming += 3;
            }
          })
          break;

        case 'my_news':
          this.newsService.findUserNews(this.userService.User._id,this.skipMy)
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.myNews  = this.myNews.concat(news)
            this.news = this.myNews;
            if(news.length > 0){
              this.skipMy += 3;
            }
          })
          break;

        default:
          break;
      }
     
    }
    // if(!this.all){
    //   this.loadingNews = true;
    //   console.log("skip",this.skipNews);
    //   this.newsService.find(
    //     {
    //       skip: this.skipNews
    //     }
    //   )
    //   .pipe(take(1))
    //   .subscribe((response:any)=>{
    //     // console.log(this.news.length);
    //     this.news = this.news.concat(response);
    //     // console.log(this.news.length);
    //     console.log("antes de sumar 3",this.skipNews);
        
    //       this.skipNews += 3;
    //       this.verMas()

    //     if (event) {
    //       event.target.complete();
    //     }
    //     if (response.length < 3) {
    //       this.skipNews -= 3 - response.length;
    //       console.log("despues de la resta ",this.skipNews);
    //     }
    //     this.loadingNews = false;
    //   })
    // }
  }

  scrollTop() {
    this.content.scrollToTop();
  }

}
