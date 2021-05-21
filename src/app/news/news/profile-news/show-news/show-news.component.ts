import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { NewsService } from 'src/app/service/news.service';
import { UserService } from 'src/app/service/user.service';
import { OptionNewsComponent } from '../../option-news/option-news.component';

@Component({
  selector: 'show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.scss'],
})
export class ShowNewsComponent implements OnInit {

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
    public popoverController: PopoverController,
  ) { }


  inactivedNews
  activeNews
  news
  ngOnInit() {
    this.newsService.findUserNews(this.userService.User._id).subscribe((response)=>{
      this.activeNews = response;
      this.news = response;
    })
    this.newsService.findUserDeletedNews(this.userService.User._id).subscribe((response)=>{
      this.inactivedNews = response;
    })
  }


  OpenNews(id) {
    this.router.navigate([`news/read/${id}`]);
  }
 async deleteNew(id) {
  let result = await  this.newsService.delete(id)

  if(result){
    await this.newsService.findUserNews(this.userService.User._id).subscribe((response)=>{
      this.news = response;
      this.activeNews = response;
    })
    await this.newsService.findUserDeletedNews(this.userService.User._id).subscribe((response)=>{
      this.inactivedNews = response;
    })
  }
  }

  async restoreNew(id) {
    let result = await  this.newsService.restore(id)
    
    if(result){
    await this.newsService.findUserNews(this.userService.User._id).subscribe((response)=>{
      this.activeNews = response;
    })
    await this.newsService.findUserDeletedNews(this.userService.User._id).subscribe((response)=>{
      this.news = response;
      this.inactivedNews = response;
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


  segmentChanged(e: CustomEvent) {
    if (e.detail.value === "active") {
      this.news = this.activeNews
    } else{
      this.news = this.inactivedNews
    }
  }

}
