import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { NewsService } from 'src/app/service/news.service';
import { UserService } from 'src/app/service/user.service';
import { ModalProgramNewsComponent } from '../modal-program-news/modal-program-news.component';
import { OptionNewsComponent } from '../option-news/option-news.component';

@Component({
  selector: 'app-profile-news',
  templateUrl: './profile-news.component.html',
  styleUrls: ['./profile-news.component.scss'],
})
export class ProfileNewsComponent implements OnInit {

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
    public popoverController: PopoverController,
    private popover: PopoverController,
    ) { }
news
  ngOnInit() {
this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
  console.log(response);
  
  this.news = response
})
  }




  editNews(idNews) {
    this.router.navigate([`news/edit/${idNews}`]);
  }

  options(data) {
    switch (data?.action) {
      case "edit":
        this.editNews(data.news);
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

  popoverOpen
  async reschedule(news){
      if (!this.popoverOpen) {
        let popover = await this.popover.create({
          component: ModalProgramNewsComponent,
          componentProps: {
            date:moment(news.programatedDate).format("YYYY-MM-DD"),
            edited:false
          },
        });
        popover.onDidDismiss().then((data) => {
          try{
            if(data.data != undefined && data.data.option == 'accept'){
              this.newsService.rescheduleNews(news._id,{date:data.data.date})
              .subscribe(response => this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
              this.news = response
            }))
            }else if(data.data.date == undefined && data.data.option != 'cancel'){
              this.newsService.rescheduleNews(news._id,{date:data.data.date})
              .subscribe(response => this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
              this.news = response
              }))
            }
            this.popoverOpen = false;
        }catch (error){}
        });
        
        return popover.present();
      }
  }
}
