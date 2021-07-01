import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { NewsService } from 'src/app/service/news.service';
import { UserService } from 'src/app/service/user.service';
import { ModalProgramNewsComponent } from '../modal-program-news/modal-program-news.component';
import { OptionNewsComponent } from '../option-news/option-news.component';
import { ShowNewsComponent } from './show-news/show-news.component';

@Component({
  selector: 'app-profile-news',
  templateUrl: './profile-news.component.html',
  styleUrls: ['./profile-news.component.scss'],
})
export class ProfileNewsComponent implements OnInit {

  @ViewChild("showNews") showNews: ShowNewsComponent;

  constructor(
    public newsService:NewsService,
    private router:Router,
    public  userService:UserService,
    public popoverController: PopoverController,
    private popover: PopoverController,
    public cd: ChangeDetectorRef,
    ) { }
news
  ngOnInit() {
this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
  this.news = response
})
  }

  indexLast = 3;
  seeMore(){
   this.indexLast += 3 
  }


  editNews(idNews) {
    this.router.navigate([`news/edit/${idNews}`]);
  }
  async deleteNew(id) {
    let result = await  this.newsService.delete(id)
  
    if(result){
      this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
        this.news = response
      })
    }
    }
  
    async restoreNew(id) {
      let result = await  this.newsService.restore(id)
      
      if(result){
        this.newsService.findUserProgramatedNews(this.userService.User._id).subscribe((response)=>{
          this.news = response
        })
    }
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



  /**
   * Esta funcion se llama cuando el usuario baja el scroll, y si llega muy abajo, entonces se llaman mas noticias automaticamente
   * @param ev
   */
 async logScrolling(ev) {
 let el = await ev.target.getScrollElement();
 this.cd.detectChanges();
 if (
   el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
   !this.showNews.loadingNews
 ) {
   this.showNews.getNews();
 }
}

}
