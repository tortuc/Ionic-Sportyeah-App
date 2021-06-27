import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReport, ReportService } from 'src/app/service/report.service';
import { UserService } from 'src/app/service/user.service';

enum Texts {
    status = "reportpage.status",
    content = "reportpage.content",
    day = "reportpage.day",
    reason = "reportpage.reason"
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit,AfterViewInit {

  public readonly Texts = Texts
  entered: boolean = false;

  constructor(
    private readonly reportService:ReportService,
    private readonly route:ActivatedRoute,
    private readonly router:Router,
    public readonly userService:UserService
  ) { }

  ngOnInit() {
    this.getReport();
  }

  public report: IReport = null;
  getReport() {
    this.reportService
      .getReportById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (report) => {
          this.report = report;
        },
        (err) => {
          this.router.navigate(["/reports"]);
        }
      );
  }

  ngAfterViewInit(){
    this.entered = true
  }

}
