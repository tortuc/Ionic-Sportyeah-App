import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  //  @Input() weekchange:any;
  @Input() changeWeekAdd:number;
  @Input() sponsorLink:any;
  @Input() weekchange:any;
  constructor(
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private viewsSponsorService:ViewsSponsorService,
    private userService:UserService,
  ) {
    
   }
  ngOnInit() { 

  }
  ngOnChanges(){   
    //this.week = moment(this.weekchange).startOf("week")
    this.takeDataWeek()
    
  }
  weekFormat
  weekEndFormat
 takeDataWeek(){
  this.weekFormat = this.week.startOf("week").format("YYYY-MM-DD");
  this.weekEndFormat = this.weekEnd.format("YYYY-MM-DD");
   this.viewsSponsorService
  .getVisitsByWeek(this.userService.User._id, this.week, "search")
  .pipe(take(1))
  .subscribe((response: any) => {
    if(response.length == 0){
      this.dataSearch = [0,0,0,0,0,0,0]
    }else{
      this.dataSearch = response;      
    }
    this.viewsSponsorService
    .getVisitsByWeek(this.userService.User._id, this.week, "post")
    .pipe(take(1))
    .subscribe((response: any) => {
      if(response.length == 0){
        this.dataPost = [0,0,0,0,0,0,0]
      }else{
        this.dataPost = response;
      }

      this.viewsSponsorService
      .getVisitsByWeek(this.userService.User._id, this.week, "profile")
      .pipe(take(1))
      .subscribe((response: any) => {
        if(response.length == 0){
          this.dataProfile = [0,0,0,0,0,0,0]
        }else{
          this.dataProfile = response;
        }
        this.viewsSponsorService
        .getVisitsByWeek(this.userService.User._id, this.week, "search")
        .pipe(take(1))
        .subscribe((response: any) => {
          if(response.length == 0){
            this.dataSearch = [0,0,0,0,0,0,0]
          }else{
            this.dataSearch = response;
          }
          this.linesDataWeek()
      
        });
      });
    });
  });
   


}

week = moment(new Date()).startOf("week");
  weekEnd = moment(new Date()).endOf("week");

  changeWeek(n) {   
    this.week = moment(this.week).add(n, "weeks");
    this.weekEnd = moment(this.weekEnd).add(n, "weeks");
    // this.changeWeekAdd = n;   
    this.takeDataWeek()
  }

  // dateStart = moment(new Date).startOf('week');
  // dateEnd = moment(new Date).endOf('week');
  allViews
  weeks

  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  rankingViews;
  newsViews;
  linesSponsorWeeks
  noData:boolean=false;// es false si no hay datos en la estadistica
  dataPost=[]
  // dataChat=[]
  dataSearch=[]
  dataProfile=[]
  // dataReaction=[]
  dataComment=[]
  dataNews=[]
  labelWeeks = [];

  // generateWeek(){
    // this.weeks =[]
    //       while (this.weekEnd.diff(this.week, 'days') >= 0) {
    //         this.weeks.push({date:this.week.format('YYYY-MM-DD'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
    //         //this.labels.push(this.week.format('MM-DD'))
    //         this.week.add(1,'days')
    //        }
    //   this.allViews.forEach((visits) => {
    //     let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
    //     for(let key in this.weeks){
    //       if(this.weeks[key].date == date){this.noData = true}
    //     }
    //   });
      
      // this.linesDataWeek()
  // }

  linesDataWeek(){
    // console.log(this.dataComment);
    // console.log(this.dataNews);
    // console.log(this.dataPost);
    // console.log(this.dataProfile);
    // console.log(this.dataSearch);
    this.labelWeeks = []
    this.cd.detectChanges()
  //   this.dataPost = []
  //   this.dataChat = []
  //   this.dataSearch = []
  //   this.dataProfile = []
  //   // this.dataReaction = []
  //   this.dataComment = []
  //   this.dataNews = []
  //   for(let key in this.weeks){
  //     this.dataPost.push(0)
  //     this.dataChat.push(0)
  //     this.dataSearch.push(0)
  //     this.dataProfile.push(0)
  //     // this.dataReaction.push(0)
  //     this.dataComment.push(0)
  //     this.dataNews.push(0)
  //   }
    for(let i=0; i <= 6 ; i++){
      this.labelWeeks.push(this.translate.instant(`days.${i}`))
    }
    
  //   this.postViews.forEach((visits) => {
  //     let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //     for(let key in this.weeks){
  //       if(this.weeks[key].date == date){
  //         this.weeks[key].post += 1
  //         this.dataPost[key] += 1
  //       }
  //     }
  //   });
  // // this.chatViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.weeks){
  // //     if(this.weeks[key].date == date){
  // //       this.weeks[key].chat += 1
  // //       this.dataChat[key] += 1
  // //     }
  // //   }  
  // // });

  // this.searchViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.weeks){
  //     if(this.weeks[key].date == date){
  //       this.weeks[key].search += 1
  //       this.dataSearch[key] += 1
  //     }
  //   } 
  // });

  // this.profileViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.weeks){
  //     if(this.weeks[key].date == date){
  //       this.weeks[key].profile += 1
  //       this.dataProfile[key] += 1
  //     }
  //   }
  // });

  // // this.reactionViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.weeks){
  // //     if(this.weeks[key].date == date){
  // //       this.weeks[key].reaction += 1
  // //       this.dataReaction[key] += 1
  // //     }
  // //   }
  // // });

  // this.commentViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.weeks){
  //     if(this.weeks[key].date == date){
  //       this.weeks[key].comment += 1
  //       this.dataComment[key] += 1
  //     }
  //   }
  // });

  // this.newsViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.weeks){
  //     if(this.weeks[key].date == date){
  //       this.weeks[key].comment += 1
  //       this.dataNews[key] += 1
  //     }
  //   }
  // });


  this.linesSponsorWeeks = new Chart("linesWeekSponsor", {
    type: 'line',
    data: {
      labels:  this.labelWeeks,
      datasets: [
        {
        label: this.translate.instant('analytics-views.post'),
        data: this.dataPost,
        borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
        borderWidth: 1
      },
      /*   {
        label: this.translate.instant('analytics-views.chat'),
        data: this.dataChat,
        borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      }, */
       {
        label: this.translate.instant('analytics-views.search'),
        data: this.dataSearch,
        borderColor: 'rgb(241, 60, 60)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(214, 60,60, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
       label: this.translate.instant('analytics-views.profile'),
       data:this.dataProfile,
       borderColor: 'rgb(106, 25, 181)', // array should have same number of elements as number of dataset
       backgroundColor: 'rgb(106, 25, 181, 0.1)',// array should have same number of elements as number of dataset
       borderWidth: 1
     },
    //  {
    //   label: this.translate.instant('analytics-views.reaction'),
    //   data: this.dataReaction,
    //   borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
    //   backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
    //   borderWidth: 1
    // },
    {
      label: this.translate.instant('analytics-views.comment'),
      data: this.dataComment,
      borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    },
    {
      label: this.translate.instant('analytics-views.news'),
      data: this.dataNews,
      borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
  } 

}