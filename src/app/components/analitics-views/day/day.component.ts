import { Component, OnInit, ChangeDetectorRef, Input, OnChanges} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';
import html2canvas from "html2canvas"; 
import { Html2CanvasService } from 'src/app/service/html2-canvas.service';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit, OnChanges {

  @Input() changeHourAdd:number;
  @Input() sponsorLink:any;
  @Input() hourchange:any;
  @Input() sponsorSelect:any;


  constructor(
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private viewsSponsorService:ViewsSponsorService,
    private userService:UserService,
    private html2Canvas:Html2CanvasService
    ) {}
postViews;
chatViews;
searchViews;
profileViews;
reactionViews;
commentViews;
rankingViews;
newsViews;

dia = moment().startOf("days")
  ngOnInit() {
  // for(let i = 1 ; i < 25;i++ ) {
  //   console.log(this.dia.hour());
  //   console.log(this.dia.format("YYYY-MM-DD-HH"));
    
  //   this.dia.add( 1,"hour")
  // }
    // this.viewsSponsorService.getVisitsByHour(this.userService.User._id,this.dia,"profile").subscribe((response)=>{
    //   console.log(response);
    // })
    // console.log(moment().hour())
    // this.takeDataDay();
  }
  ngOnChanges(){
    this.takeDataDay()
  }
  changeDay(n) { 
    console.log(n);
    this.hour = moment(this.hour).add(n, "days");
    console.log(this.hour);

    this.takeDataDay();
  }
  takeDataDay() {
    this.hourShow = moment(this.hour).format("DD-MM-YYYY")
    this.viewsSponsorService
      .getVisitsByHour(this.userService.User._id, this.hour, "search",this.sponsorSelect)
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response.length == 0) {
          this.dataSearch = [0, 0, 0, 0, 0, 0, 0];
        } else {
          this.dataSearch = response;
        }
        this.viewsSponsorService
          .getVisitsByHour(this.userService.User._id, this.hour, "post",this.sponsorSelect)
          .pipe(take(1))
          .subscribe((response: any) => {
              this.dataPost = response;

            this.viewsSponsorService
              .getVisitsByHour(this.userService.User._id, this.hour, "profile",this.sponsorSelect)
              .pipe(take(1))
              .subscribe((response: any) => {
              
                  this.dataProfile = response;
                this.viewsSponsorService
                  .getVisitsByHour(
                    this.userService.User._id,
                    this.hour,
                    "comment",this.sponsorSelect
                  )
                  .pipe(take(1))
                  .subscribe((response: any) => {
                   
                      this.dataComment = response;
                    this.linesHours();
                  });
              });
          });
      });
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
  hour = moment().startOf("days")
  hourShow

  linesHours(){
  this.cd.detectChanges()
  this.labelHours = [];

  for(let i=0; i <= 24 ; i++){
    this.labelHours.push(i)
  }

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
        //   {
        //   label: this.translate.instant('analytics-views.chat'),
        //   data: this.dataChat,
        //   borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        //   backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
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
  imgcreada = false;

  imagenCreada;
  img

  crearImagen() {
    // html2canvas(document.querySelector("#contenido")).then(canvas => {

    //   this.imagenCreada = canvas.toDataURL();      
    //   console.log(this.imagenCreada);
      
    // });
    // this.imgcreada = true;
  
    const element = document.getElementById('html2canvas');
    const targetElement = document.getElementById('target').cloneNode(true);
    element.appendChild(targetElement);
    this.html2Canvas.html2canvas(element.firstChild).then((img) => {
        this.img = img;
        element.firstChild.remove();
    }).catch((res) => {
        console.log(res);
    });
  }
  
}
