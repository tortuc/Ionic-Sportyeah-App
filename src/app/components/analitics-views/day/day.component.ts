import { Component, OnInit, ChangeDetectorRef, Input, OnChanges,ViewChild,ElementRef} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';
import { Html2CanvasService } from 'src/app/service/html2-canvas.service';
import html2canvas from "html2canvas"; 
import { PdfMakeService } from 'src/app/service/pdf-make.service';

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
    private html2Canvas:Html2CanvasService,
    private pdfMakeSerice:PdfMakeService
    ) {}
    imgcreada=false
    imagenCreada
    // capture(){
    //   const element = document.getElementById('html2canvas');
    //   const targetElement = document.getElementById('linesHourSponsor')
    //   element.appendChild(targetElement);
    //   this.html2Canvas.html2canvas(element.firstChild).then( (img) => {
    //     this.img = img;
    //     element.firstChild.remove();
    //    const original = document.getElementById("contenido");
    //    const nuevoCanvas = document.createElement("canvas")
    //     nuevoCanvas.style.width = "400px"
    //     nuevoCanvas.style.height = "400px";
    //     nuevoCanvas.setAttribute("id","linesHourSponsor")
    //     original.append(nuevoCanvas)
        
    //      this.linesHours()
    // }).catch((res) => {
    //     console.log(res);
    // });
    // }
    // img

    pdfDay(){
      this.pdfMakeSerice.generatePdf(this.sponsorSelect,'day',this.hour )
    }
postViews;
chatViews;
searchViews;
profileViews;
reactionViews;
commentViews;
rankingViews;
newsViews;

dia = moment().startOf("days")
date
  ngOnInit() { }
  ngOnChanges(){
    this.takeDataDay()
  }
  changeDay(n) { 
    this.hour = moment(this.hour).add(n, "days");
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
        responsive: true,
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
