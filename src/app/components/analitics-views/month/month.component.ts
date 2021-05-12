import { Component, OnInit, ChangeDetectorRef, Input, OnChanges } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { Chart } from "chart.js";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { UserService } from "src/app/service/user.service";
import { take } from "rxjs/operators";

@Component({
  selector: "month",
  templateUrl: "./month.component.html",
  styleUrls: ["./month.component.scss"],
})
export class MonthComponent implements OnInit , OnChanges{
  @Input() monthchange: any;
  @Input() changeMonthAdd: number;
  @Input() sponsorLink: any;
  @Input() sponsorSelect:any;

  constructor(
    private translate: TranslateService,
    private cd: ChangeDetectorRef,
    private viewsSponsorService: ViewsSponsorService,
    private userService: UserService
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    this.takeDataMonth();
  }
  month = moment().startOf("month");

  allViews;
  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  rankingViews;
  newsViews;

  noData: boolean = false; // es false si no hay datos en la estadistica
  dataPost = [];
  dataChat = [];
  dataSearch = [];
  dataProfile = [];
  // dataReaction=[]
  dataComment = [];
  dataNews = [];

  months = [];
  monthName;

  labelMonths = [];
  linesSponsor;

  takeDataMonth() {
    this.monthName = this.translate.instant(`months.${this.month.month()}`);
    this.viewsSponsorService
      .getVisitsByMonth(this.userService.User._id, this.month, "search",this.sponsorSelect)
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response.length == 0) {
          this.dataSearch = [0, 0, 0, 0, 0, 0, 0];
        } else {
          this.dataSearch = response;
        }
        this.viewsSponsorService
          .getVisitsByMonth(this.userService.User._id, this.month, "post",this.sponsorSelect)
          .pipe(take(1))
          .subscribe((response: any) => {
            if (response.length == 0) {
              this.dataPost = [0, 0, 0, 0, 0, 0, 0];
            } else {
              this.dataPost = response;
            }

            this.viewsSponsorService
              .getVisitsByMonth(
                this.userService.User._id,
                this.month,
                "profile",this.sponsorSelect
              )
              .pipe(take(1))
              .subscribe((response: any) => {
                if (response.length == 0) {
                  this.dataProfile = [0, 0, 0, 0, 0, 0, 0];
                } else {
                  this.dataProfile = response;
                }
                this.viewsSponsorService
                  .getVisitsByMonth(
                    this.userService.User._id,
                    this.month,
                    "comment",this.sponsorSelect
                  )
                  .pipe(take(1))
                  .subscribe((response: any) => {
                    if (response.length == 0) {
                      this.dataComment = [0, 0, 0, 0, 0, 0, 0];
                    } else {
                      this.dataComment = response;
                    }
                    this.linesDataMonths();
                  });
              });
          });
      });
  }

  changeMonth(n) {
    this.month = moment(this.month).add(n, "month");
    this.takeDataMonth();
  }
  linesDataMonths() {
    this.labelMonths = [];
    this.cd.detectChanges();

    for (let i = 1; i <= this.month.daysInMonth(); i++) {
      this.labelMonths.push(i);
    }

    this.linesSponsor = new Chart("linesMonthSponsor", {
      type: "line",
      data: {
        labels: this.labelMonths,
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
          // {
          //   label: this.translate.instant("analytics-views.news"),
          //   data: this.dataNews,
          //   borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
          //   backgroundColor: "rgb(38, 194,129, 0.1)", // array should have same number of elements as number of dataset
          //   borderWidth: 1,
          // },
        ],
      },
      options: {
        responsive: true,
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
