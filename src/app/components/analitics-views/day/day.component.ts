import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {

  @Input() changeHourAdd:number;
  @Input() sponsorLink:any;
  @Input() hourchange:any;


  constructor(
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private viewsSponsorService:ViewsSponsorService,
    private userService:UserService,
    ) {}
postViews;
chatViews;
searchViews;
profileViews;
reactionViews;
commentViews;
rankingViews;
newsViews;

  ngOnInit() {

  }
  ngOnChanges(){
    this.getData()
    this.hour = moment(this.hourchange).startOf("days")
  }
  getData(){
 
  }
  noData:boolean=false;// es false si no hay datos en la estadistica
  dataPost=[]
  dataChat=[]
  dataSearch=[]
  dataProfile=[]
  dataReaction=[]
  dataComment=[]
  labelHours=[];
  hours=[];
  linesHourSponsor;
  hour
// generateDay(){
//   this.day = moment(this.hourStart).add(-1,'days');
//   this.hourStart = moment(this.hourStart ).add(-1,'days');
//   this.hourEnd = moment(this.hourEnd ).add(-1,'days');
//   this.noData = false;
//   this.hours = []
//   this.labelHours = [];
//   this.hourStart.set('hours', 0); 
//   this.hourEnd.set('hours', 0);
//   this.hourEnd.add(24,'hours')
//   while (this.hourEnd.diff(this.hourStart, 'hours') >= 1) {
//     this.hours.push({date:this.hourStart.format('YYYY-MM-DD-HH'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
//     this.hourStart.add(1,'hours')
//   }

//   this.allData.forEach((visits) => {
//     let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
//     for(let key in this.hours){
//       if(this.hours[key].date == date){ this.noData = true}
//     }
//   });
  
//   this.linesHours()
// }

linesHours(){
  this.cd.detectChanges()
  // this.dataPost = []
  // this.dataChat = []
  // this.dataSearch = []
  // this.dataProfile = []
  // this.dataReaction = []
  // this.dataComment = []
  // for(let key in this.hours){
  //   this.dataPost.push(0)
  //   this.dataChat.push(0)
  //   this.dataSearch.push(0)
  //   this.dataProfile.push(0)
  //   this.dataReaction.push(0)
  //   this.dataComment.push(0)
  // }
  for(let i=0; i <= 24 ; i++){
    this.labelHours.push(i)
  }

  //   this.postViews.forEach((visits) => {
  //     let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //     for(let key in this.hours){
  //       if(this.hours[key].date == date){
  //         this.hours[key].post += 1
  //         this.dataPost[key] += 1
  //       }
  //     }
  //   });

  // this.chatViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //   for(let key in this.hours){
  //     if(this.hours[key].date == date){
  //       this.hours[key].chat += 1
  //       this.dataChat[key] += 1
  //     }
  //   } 
  // });

  // this.searchViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //   for(let key in this.hours){
  //     if(this.hours[key].date == date){
  //       this.hours[key].search += 1
  //       this.dataSearch[key] += 1
  //     }
  //   } 
  // });

  // this.profileViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //   for(let key in this.hours){
  //     if(this.hours[key].date == date){
  //       this.hours[key].profile += 1
  //       this.dataProfile[key] += 1
  //     }
  //   }
  // });

  // this.reactionViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //   for(let key in this.hours){
  //     if(this.hours[key].date == date){
  //       this.hours[key].reaction += 1
  //       this.dataReaction[key] += 1
  //     }
  //   }
  // });

  // this.commentViews.forEach((visits) => {
  //   let date = moment(new Date(visits.date)).format('YYYY-MM-DD-HH')
  //   for(let key in this.hours){
  //     if(this.hours[key].date == date){
  //       this.hours[key].comment += 1
  //       this.dataComment[key] += 1
  //     }
  //   }
  // });

    this.linesHourSponsor = new Chart("linesHourSponsor", {
      type: 'line',
      data: {
        labels: this.labelHours,
        datasets: [
          {
          label: this.translate.instant('analytics-views.post'),
          data: this.dataPost,
          borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
          backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
          borderWidth: 1
        },
          {
          label: this.translate.instant('analytics-views.chat'),
          data: this.dataChat,
          borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
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
       {
        label: this.translate.instant('analytics-views.reaction'),
        data: this.dataReaction,
        borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
        label: this.translate.instant('analytics-views.comment'),
        data: this.dataComment,
        borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
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
