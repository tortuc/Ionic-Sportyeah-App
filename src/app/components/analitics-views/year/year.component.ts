import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
})
export class YearComponent implements OnInit {

  @Input() yearchange:any;
  @Input() changeYearAdd:any;
  @Input() sponsorLink:any;

  constructor(
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private viewsSponsorService:ViewsSponsorService,
    private userService:UserService,
  ) {}

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log(moment(this.yearchange).format("DD-MM-YYYY"))
    
    console.log(moment(this.year).format("DD-MM-YYYY"))
    this.takeDataYear()
  }
  year=moment().startOf("year");
  yearDate = new Date().getFullYear();
  allViews
  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  // rankingViews;
  newsViews;

  noData:boolean=false;// es false si no hay datos en la estadistica
  dataPost=[]
  dataNews=[]
  dataChat=[]
  dataSearch=[]
  dataProfile=[]
  // dataReaction=[]
  dataComment=[]

  labelYears = [];
  linesSponsorYear
  

  years =[]
  daysYears=[]

  data=[]

  changeYear(n) {
    this.year = moment(this.year).add(n, "years");
 this.yearDate = this.yearDate + n;
    this.takeDataYear()
  }

  takeDataYear(){
    this.viewsSponsorService
   .getVisitsByYear(this.userService.User._id, this.year, "search")
   .pipe(take(1))
   .subscribe((response: any) => {
     if(response.length == 0){
       this.dataSearch = [0,0,0,0,0,0,0]
     }else{
       this.dataSearch = response;      
     }
     this.viewsSponsorService
     .getVisitsByYear(this.userService.User._id, this.year, "post")
     .pipe(take(1))
     .subscribe((response: any) => {
       if(response.length == 0){
         this.dataPost = [0,0,0,0,0,0,0]
       }else{
         this.dataPost = response;
       }
 
       this.viewsSponsorService
       .getVisitsByYear(this.userService.User._id, this.year, "profile")
       .pipe(take(1))
       .subscribe((response: any) => {
         if(response.length == 0){
           this.dataProfile = [0,0,0,0,0,0,0]
         }else{
           this.dataProfile = response;
         }
         this.viewsSponsorService
         .getVisitsByYear(this.userService.User._id, this.year, "search")
         .pipe(take(1))
         .subscribe((response: any) => {
           if(response.length == 0){
             this.dataSearch = [0,0,0,0,0,0,0]
           }else{
             this.dataSearch = response;
           }
           this.linesDataYears()
           
         });
       });
     });
   });
    
 
 
 }
 
  // generateYear(){
  //   this.noData = false;
  //   this.years =[]

  //     this.dateStart.set('month', 0);  
  //     this.dateStart.set('date', 1);
  //    // this.dateEnd.set('year',(year.getFullYear()));
  //     this.dateEnd.set('month', 0);  
  //     this.dateEnd.set('date', 0);
  //     this.dateEnd.add(11, 'month')
  //     this.dateEnd.add(31, 'days')

  //     while (this.dateEnd.diff(this.dateStart, 'years') >= 0) {
  //       while (this.dateEnd.diff(this.dateStart, 'months') >= 0) {
  //         while (this.dateEnd.diff(this.dateStart, 'days') >= 0) {
  //           this.years.push({date:this.dateStart.format('YYYY-MM-DD'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
  //           //this.labels.push(this.dateStart.format('MM-DD'))
  //           this.dateStart.add(1,'days')
  //          }
  //         this.dateStart.add(1,'month')
  //        }
  //       this.dateStart.add(1,'year')
  //     } 
  //     this.dateStart.add(-2,'years')
  //     this.dateStart.add(-1,'months')
 
  //     this.allViews.forEach((visits) => {
  //       let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //       for(let key in this.years){
  //         if(this.years[key].date == date){this.noData = true}
  //       }
  //     });
    
  //     this.linesDataYears()
    
  // }
 
  linesDataYears(){
    // console.log(this.dataComment);
    // console.log(this.dataNews);
    // console.log(this.dataPost);
    // console.log(this.dataProfile);
    // console.log(this.dataSearch);
    this.labelYears = []
    this.cd.detectChanges()
    // this.dataPost = []
    // this.dataChat = []
    // this.dataSearch = []
    // this.dataProfile = []
    // // this.dataReaction = []
    // this.dataComment = []
    // this.dataNews = []
    // for(let i=1 ; i <= 12; i++){
    //   this.dataPost.push(0)
    //   this.dataChat.push(0)
    //   this.dataSearch.push(0)
    //   this.dataProfile.push(0)
    //   // this.dataReaction.push(0)
    //   this.dataComment.push(0)
    //   this.dataNews.push(0)
    // }
    for(let i=0; i <= 11 ; i++){
      this.labelYears.push(this.translate.instant(`months.${i}`))
    }
  //   this.postViews.forEach((visits) => {
  //     let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //     for(let key in this.years){
  //       let mes = moment(new Date(this.years[key].date)).format('MM')
  //       if(this.years[key].date == date){
  //         this.years[key].post += 1
  //         this.dataPost[+mes-1] += 1
  //       }
  //     }
  //   });

  // // this.chatViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.years){
  // //     let mes = moment(new Date(this.years[key].date)).format('MM')
  // //     if(this.years[key].date == date){
  // //       this.years[key].chat += 1
  // //       this.dataChat[+mes-1] += 1
  // //     }
  // //   }  
  // // });

  // this.searchViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.years){
  //     let mes = moment(new Date(this.years[key].date)).format('MM')
  //     if(this.years[key].date == date){
  //       this.years[key].search += 1
  //       this.dataSearch[+mes-1] += 1
  //     }
  //   } 
  // });

  // this.profileViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.years){
  //     let mes = moment(new Date(this.years[key].date)).format('MM')
  //     if(this.years[key].date == date){
  //       this.years[key].profile += 1
  //       this.dataProfile[+mes-1] += 1
  //     }
  //   }
  // });

  // // this.reactionViews.forEach((visits) => {
  // //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  // //   for(let key in this.years){
  // //     let mes = moment(new Date(this.years[key].date)).format('MM')
  // //     if(this.years[key].date == date){
  // //       this.years[key].reaction += 1
  // //       this.dataReaction[+mes-1] += 1
  // //     }
  // //   }
  // // });

  // this.commentViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.years){
  //     let mes = moment(new Date(this.years[key].date)).format('MM')
  //     if(this.years[key].date == date){
  //       this.years[key].comment += 1
  //       this.dataComment[+mes-1] += 1
  //     }
  //   }
  // });

  // this.newsViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD')
  //   for(let key in this.years){
  //     let mes = moment(new Date(this.years[key].date)).format('MM')
  //     if(this.years[key].date == date){
  //       this.years[key].comment += 1
  //       this.dataNews[+mes-1] += 1
  //     }
  //   }
  // });





  this.linesSponsorYear = new Chart("linesYearSponsor", {
    type: 'line',
    data: {
      labels: [ 
      this.translate.instant('months.0'),this.translate.instant('months.1'),this.translate.instant('months.2'),
      this.translate.instant('months.3'),this.translate.instant('months.4'),this.translate.instant('months.5'),
      this.translate.instant('months.6'),this.translate.instant('months.7'),this.translate.instant('months.8'),
      this.translate.instant('months.9'),this.translate.instant('months.10'),this.translate.instant('months.11')],
      datasets: [
        {
        label: this.translate.instant('analytics-views.post'),
        data: this.dataPost,
        borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
        borderWidth: 1
      },
      //   {
      //   label: this.translate.instant('analytics-views.chat'),
      //   data: this.dataChat,
        // borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        // backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
      //   borderWidth: 1
      // },
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
