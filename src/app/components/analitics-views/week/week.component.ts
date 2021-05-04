import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { Chart } from "chart.js";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { UserService } from "src/app/service/user.service";
import { take } from "rxjs/operators";

@Component({
  selector: "week",
  templateUrl: "./week.component.html",
  styleUrls: ["./week.component.scss"],
})
export class WeekComponent implements OnInit {
  //  @Input() weekchange:any;
  @Input() changeWeekAdd: number;
  @Input() sponsorLink: any;
  @Input() weekchange: any;
  constructor(
    private translate: TranslateService,
    private cd: ChangeDetectorRef,
    private viewsSponsorService: ViewsSponsorService,
    private userService: UserService
  ) {}
  ngOnInit() {}
  ngOnChanges() {
    //this.week = moment(this.weekchange).startOf("week")
    this.takeDataWeek();
  }
  weekFormat;
  weekEndFormat;
  takeDataWeek() {
    this.weekFormat = this.week.startOf("week").format("YYYY-MM-DD");
    this.weekEndFormat = this.weekEnd.format("YYYY-MM-DD");
    this.viewsSponsorService
      .getVisitsByWeek(this.userService.User._id, this.week, "search")
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response.length == 0) {
          this.dataSearch = [0, 0, 0, 0, 0, 0, 0];
        } else {
          this.dataSearch = response;
        }
        this.viewsSponsorService
          .getVisitsByWeek(this.userService.User._id, this.week, "post")
          .pipe(take(1))
          .subscribe((response: any) => {
            if (response.length == 0) {
              this.dataPost = [0, 0, 0, 0, 0, 0, 0];
            } else {
              this.dataPost = response;
            }

            this.viewsSponsorService
              .getVisitsByWeek(this.userService.User._id, this.week, "profile")
              .pipe(take(1))
              .subscribe((response: any) => {
                if (response.length == 0) {
                  this.dataProfile = [0, 0, 0, 0, 0, 0, 0];
                } else {
                  this.dataProfile = response;
                }
                this.viewsSponsorService
                  .getVisitsByWeek(
                    this.userService.User._id,
                    this.week,
                    "search"
                  )
                  .pipe(take(1))
                  .subscribe((response: any) => {
                    if (response.length == 0) {
                      this.dataSearch = [0, 0, 0, 0, 0, 0, 0];
                    } else {
                      this.dataSearch = response;
                    }
                    this.linesDataWeek();
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
    this.takeDataWeek();
  }

  allViews;
  weeks;

  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  rankingViews;
  newsViews;
  linesSponsorWeeks;
  noData: boolean = false; // es false si no hay datos en la estadistica
  dataPost = [];
  // dataChat=[]
  dataSearch = [];
  dataProfile = [];
  // dataReaction=[]
  dataComment = [];
  dataNews = [];
  labelWeeks = [];

  linesDataWeek() {
    this.labelWeeks = [];
    this.cd.detectChanges();

    for (let i = 0; i <= 6; i++) {
      this.labelWeeks.push(this.translate.instant(`days.${i}`));
    }

    this.linesSponsorWeeks = new Chart("linesWeekSponsor", {
      type: "line",
      data: {
        labels: this.labelWeeks,
        datasets: [
          {
            label: this.translate.instant("analytics-views.post"),
            data: this.dataPost,
            borderColor: "rgb(56, 94, 129)", // array should have same number of elements as number of dataset
            backgroundColor: "rgb(56, 94, 129, 0.1)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },

          {
            label: this.translate.instant("analytics-views.search"),
            data: this.dataSearch,
            borderColor: "rgb(241, 60, 60)", // array should have same number of elements as number of dataset
            backgroundColor: "rgb(214, 60,60, 0.1)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
          {
            label: this.translate.instant("analytics-views.profile"),
            data: this.dataProfile,
            borderColor: "rgb(106, 25, 181)", // array should have same number of elements as number of dataset
            backgroundColor: "rgb(106, 25, 181, 0.1)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },

          {
            label: this.translate.instant("analytics-views.comment"),
            data: this.dataComment,
            borderColor: "rgb(238, 241, 48)", // array should have same number of elements as number of dataset
            backgroundColor: "rgb(238, 241, 48, 0.1)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
          {
            label: this.translate.instant("analytics-views.news"),
            data: this.dataNews,
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            backgroundColor: "rgb(38, 194,129, 0.1)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  }
}
