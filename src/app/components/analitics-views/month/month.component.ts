import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {

  @Input() monthchange:any;
  @Input() changeMonthAdd:number;
  @Input() sponsorLink:any;

  constructor(
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private viewsSponsorService:ViewsSponsorService,
    private userService:UserService,
  ) { }

  ngOnInit() {
    console.log(this.monthchange)
    console.log(this.changeMonthAdd)
  }
  ngOnChanges(){
    this.takeDataMonth()
  }
  month = moment().startOf("month");

  allViews
  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  rankingViews;
  newsViews;
   

  noData:boolean=false;// es false si no hay datos en la estadistica
  dataPost=[]
  dataChat=[]
  dataSearch=[]
  dataProfile=[]
  // dataReaction=[]
  dataComment=[]
  dataNews=[]

  months=[];
  monthName;

  labelMonths = [];
  linesSponsor

  takeDataMonth(){
    console.log("Ejecuto");
    
    this.monthName = this.translate.instant(`months.${this.month.month()}`);
    this.viewsSponsorService
   .getVisitsByMonth(this.userService.User._id, this.month, "search")
   .pipe(take(1))
   .subscribe((response: any) => {
     if(response.length == 0){
       this.dataSearch = [0,0,0,0,0,0,0]
     }else{
       this.dataSearch = response;      
     }
     this.viewsSponsorService
     .getVisitsByMonth(this.userService.User._id, this.month, "post")
     .pipe(take(1))
     .subscribe((response: any) => {
       if(response.length == 0){
         this.dataPost = [0,0,0,0,0,0,0]
       }else{
         this.dataPost = response;
       }
 
       this.viewsSponsorService
       .getVisitsByMonth(this.userService.User._id, this.month, "profile")
       .pipe(take(1))
       .subscribe((response: any) => {
         if(response.length == 0){
           this.dataProfile = [0,0,0,0,0,0,0]
         }else{
           this.dataProfile = response;
         }
         this.viewsSponsorService
         .getVisitsByMonth(this.userService.User._id, this.month, "search")
         .pipe(take(1))
         .subscribe((response: any) => {
           if(response.length == 0){
             this.dataSearch = [0,0,0,0,0,0,0]
           }else{
             this.dataSearch = response;
           }
           this.linesDataMonths()
       
         });
       });
     });
   });
    
 
 
 }
  // generateMonth(){
  //   this.noData = false;
  //   this.months =[];
  //   this.labelMonths = [];
  //   this.monthName = this.translate.instant(`months.${this.month.month()}`)
  //     this.monthStart.set('date', 1);
  //     this.monthEnd.add(1-(+this.monthEnd.format('DD')),'day');
  //     this.monthEnd.add(this.monthEnd.daysInMonth(),'day');
  //     this.monthEnd.add(-1,'day');
      
  //         while (this.monthEnd.diff(this.monthStart, 'days') >= 0) {
  //           this.months.push({date:this.monthStart.format('YYYY-MM-DD'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
  //           this.monthStart.add(1,'days')
  //          }
          
  //          this.monthStart = moment(this.monthStart ).add(-1,'month'); 

  //     this.allViews.forEach((visits) => {
  //       let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
  //       for(let key in this.months){
  //         if(this.months[key].date == date){this.noData = true}
  //       }
  //     });
          
  //     this.linesDataMonths()
  // }
  
  changeMonth(n) {
    this.month = moment(this.month).add(n, "month");
    this.takeDataMonth()
  }
  linesDataMonths(){
/*     console.log(this.dataComment);
    console.log(this.dataNews);
    console.log(this.dataPost);
    console.log(this.dataProfile);
    console.log(this.dataSearch); */
    this.labelMonths = []
    this.cd.detectChanges()
  //   this.dataPost = []
  //   this.dataChat = []
  //   this.dataSearch = []
  //   this.dataProfile = []
  //   // this.dataReaction = []
  //   this.dataComment = []
  //   this.dataNews = []
  //   for(let key in this.months){
  //     this.dataPost.push(0)
  //     this.dataChat.push(0)
  //     this.dataSearch.push(0)
  //     this.dataProfile.push(0)
  //     // this.dataReaction.push(0)
  //     this.dataComment.push(0)
  //     this.dataNews.push(0)
  //   }
  for(let i=1; i <= this.month.daysInMonth() ; i++){
    this.labelMonths.push( i)
  }
  //   this.postViews.forEach((visits) => {
  //     let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //     for(let key in this.months){
  //       if(this.months[key].date == date){
  //         this.months[key].post += 1
  //         this.dataPost[key] += 1
  //         console.log("es igual" );
          
  //       }
  //     }
  //   });
  // // this.chatViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.months){
  // //     if(this.months[key].date == date){
  // //       this.months[key].chat += 1
  // //       this.dataChat[key] += 1
  // //     }
  // //   }  
  // // });

  // this.searchViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.months){
  //     if(this.months[key].date == date){
  //       this.months[key].search += 1
  //       this.dataSearch[key] += 1
  //     }
  //   } 
  // });

  // this.profileViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.months){
  //     if(this.months[key].date == date){
  //       this.months[key].profile += 1
  //       this.dataProfile[key] += 1
  //     }
  //   }
  // });

  // // this.reactionViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.months){
  // //     if(this.months[key].date == date){
  // //       this.months[key].reaction += 1
  // //       this.dataReaction[key] += 1
  // //     }
  // //   }
  // // });

  // this.commentViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.months){
  //     if(this.months[key].date == date){
  //       this.months[key].comment += 1
  //       this.dataComment[key] += 1
  //     }
  //   }
  // });

  // this.newsViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.months){
  //     if(this.months[key].date == date){
  //       this.months[key].comment += 1
  //       this.dataNews[key] += 1
  //     }
  //   }
  // });


  this.linesSponsor = new Chart("linesMonthSponsor", {
    type: 'line',
    data: {
      labels:  this.labelMonths,
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
