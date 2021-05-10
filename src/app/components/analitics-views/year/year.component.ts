import { Component, OnInit, ChangeDetectorRef, Input, OnChanges } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { Chart } from "chart.js";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { UserService } from "src/app/service/user.service";
import { take } from "rxjs/operators";

@Component({
  selector: "year",
  templateUrl: "./year.component.html",
  styleUrls: ["./year.component.scss"],
})
export class YearComponent implements OnInit, OnChanges {
  @Input() yearchange: any;
  @Input() changeYearAdd: any;
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
    this.takeDataYear();
  }
  year = moment().startOf("year");
  yearDate = new Date().getFullYear();
  allViews;
  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  // rankingViews;
  newsViews;

  noData: boolean = false; // es false si no hay datos en la estadistica
  dataPost = [];
  dataNews = [];
  dataChat = [];
  dataSearch = [];
  dataProfile = [];
  // dataReaction=[]
  dataComment = [];

  labelYears = [];
  linesSponsorYear;

  years = [];
  daysYears = [];

  data = [];

  changeYear(n) {
    this.year = moment(this.year).add(n, "years");
    this.yearDate = this.yearDate + n;
    this.takeDataYear();
  }

  takeDataYear() {
    this.viewsSponsorService
      .getVisitsByYear(this.userService.User._id, this.year, "search",this.sponsorSelect)
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response.length == 0) {
          this.dataSearch = [0, 0, 0, 0, 0, 0, 0];
        } else {
          this.dataSearch = response;
        }
        this.viewsSponsorService
          .getVisitsByYear(this.userService.User._id, this.year, "post",this.sponsorSelect)
          .pipe(take(1))
          .subscribe((response: any) => {
            if (response.length == 0) {
              this.dataPost = [0, 0, 0, 0, 0, 0, 0];
            } else {
              this.dataPost = response;
            }

            this.viewsSponsorService
              .getVisitsByYear(this.userService.User._id, this.year, "profile",this.sponsorSelect)
              .pipe(take(1))
              .subscribe((response: any) => {
                if (response.length == 0) {
                  this.dataProfile = [0, 0, 0, 0, 0, 0, 0];
                } else {
                  this.dataProfile = response;
                }
                this.viewsSponsorService
                  .getVisitsByYear(
                    this.userService.User._id,
                    this.year,
                    "comment",this.sponsorSelect
                  )
                  .pipe(take(1))
                  .subscribe((response: any) => {
                    if (response.length == 0) {
                      this.dataComment = [0, 0, 0, 0, 0, 0, 0];
                    } else {
                      this.dataComment = response;
                    }
                    this.linesDataYears();
                  });
              });
          });
      });
  }

  linesDataYears() {
    this.labelYears = [];
    this.cd.detectChanges();

    for (let i = 0; i <= 11; i++) {
      this.labelYears.push(this.translate.instant(`months.${i}`));
    }

    this.linesSponsorYear = new Chart("linesYearSponsor", {
      type: "line",
      data: {
        labels: [
          this.translate.instant("months.0"),
          this.translate.instant("months.1"),
          this.translate.instant("months.2"),
          this.translate.instant("months.3"),
          this.translate.instant("months.4"),
          this.translate.instant("months.5"),
          this.translate.instant("months.6"),
          this.translate.instant("months.7"),
          this.translate.instant("months.8"),
          this.translate.instant("months.9"),
          this.translate.instant("months.10"),
          this.translate.instant("months.11"),
        ],
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
