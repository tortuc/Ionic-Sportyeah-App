import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { NewsService } from 'src/app/service/news.service';
import { UserService } from 'src/app/service/user.service';
import { OptionNewsComponent } from '../../option-news/option-news.component';

@Component({
  selector: 'show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.scss'],
})
export class ShowNewsComponent implements OnInit {

  public loadingNews: boolean;
  @ViewChild("content", { static: false }) content: IonContent;

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
    public popoverController: PopoverController,
    public cd: ChangeDetectorRef,
  ) { }


  inactivedNews
  activeNews
  draftNews
  news
  ngOnInit() {
     this.newsService.findUserNews(this.userService.User._id,this.skipMy)
    .pipe(take(1))
    .subscribe((response:any)=>{
      this.activeNews = response;
      this.news = response;
      this.skipMy += 3;
    })
    this.newsService.findUserDeletedNews(this.userService.User._id,this.skipDeleted)
    .pipe(take(1))
    .subscribe((response)=>{
      this.inactivedNews = response;
      this.skipDeleted += 3;
    })
    this.newsService.findUserDraftNews(this.userService.User._id,this.skipDraft)
    .pipe(take(1))
    .subscribe((response)=>{
      this.draftNews = response;
      this.skipDraft += 3;
    })
  }


  OpenNews(id) {
    this.router.navigate([`news/read/${id}`]);
  }
 async deleteNew(news) {
   
  let result:any = await  this.newsService.delete(news)
  if(result){
    await this.newsService.findUserNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.skipMy = 3;
      if(result.draftCopy == true){
        this.activeNews = response;
      }else{
        this.news = response;
        this.activeNews = response;
      }
    })
    await this.newsService.findUserDeletedNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.skipDeleted = 3;
      this.inactivedNews = response;
    })
    this.newsService.findUserDraftNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.skipDraft = 3;
      if(result.draftCopy == false){
        this.draftNews = response;
      }else{
        this.news = response;
        this.draftNews = response;
      }
    })
  }
  }

  async restoreNew(id) {
    let result = await  this.newsService.restore(id)
    
    if(result){
    await this.newsService.findUserNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.activeNews = response;
      this.skipMy = 3;
    })
    await this.newsService.findUserDeletedNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.news = response;
      this.inactivedNews = response;
      this.skipDeleted = 3;
    })
    this.newsService.findUserDraftNews(this.userService.User._id,0)
    .pipe(take(1))
    .subscribe((response)=>{
      this.draftNews = response;
      this.skipDraft = 3;
    })
  }
  }

  

  editNews(idNews) {
    this.router.navigate([`news/edit/${idNews}`]);
  }

  options(data) {
    switch (data?.action) {
      case "delete":
        this.deleteNew(data.news);
        break;
      case "edit":
        this.editNews(data.news);
        break;
      case "restore":
        this.restoreNew(data.news);
        break;

      default:
        break;
    }
  }
  async openOptions(ev: any, news) {
    const popover = await this.popoverController.create({
      component: OptionNewsComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      componentProps: { news },
    });
    popover.onDidDismiss().then((data) => {
      this.options(data.data);
    });
    return await popover.present();
  }

  segment = "active"
  segmentChanged(e: CustomEvent) {
    if (e.detail.value == "active") {
      this.news = this.activeNews
      this.segment = e.detail.value
    } else if(e.detail.value == "inactive"){
      this.news = this.inactivedNews
      this.segment = e.detail.value
    }else{
      this.news = this.draftNews
      this.segment = e.detail.value
    }
  }




  all: boolean;
  skipDeleted = 0;
  skipDraft = 0;
  skipMy = 0;

  daysBefore = 7;
  getNews(event = null, newPosts = false){
    if (newPosts) {
      this.skipMy = 0;
      this.news = [];
      this.all = false;
      this.scrollTop();
    }
    if(!this.all){
      switch (this.segment) {
        case 'active':
          this.newsService.findUserNews(this.userService.User._id,this.skipMy)
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.activeNews  = this.activeNews.concat(news)
            this.news = this.activeNews;
            if(news.length > 0){
              this.skipMy += 3;
            }
          })
          break;
      
        case 'inactive':
          this.newsService.findUserDeletedNews(this.userService.User._id,this.skipDeleted)
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.inactivedNews  = this.inactivedNews.concat(news)
            this.news = this.inactivedNews;
            if(news.length > 0){
              this.skipDeleted += 3;
            }
          })
          break;

        case 'draft':
          this.newsService.findUserDraftNews(this.userService.User._id,this.skipDraft)
          .pipe(take(1))
          .subscribe((news:any)=>{
            this.draftNews = this.draftNews.concat(news)
            this.news = this.draftNews;
            if(news.length > 0){
              this.skipDraft += 3;
            }
          })
          break;

        default:
          break;
      }
     
    }
  
  }

  scrollTop() {
    this.content.scrollToTop();
  }

}
