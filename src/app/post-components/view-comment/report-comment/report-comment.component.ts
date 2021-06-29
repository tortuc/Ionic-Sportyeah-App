import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IComment } from "src/app/models/iPost";
import { LoadingService } from "src/app/service/loading.service";
import { ReportService } from "src/app/service/report.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "report.title",
  hint = "report.hint",
  reasons = "report.reasons",
  sex = "report.sex",
  violence = "report.violence",
  pedophilia = "report.pedophilia",
  abuse_person = "report.abuse_person",
  abuse_animal = "report.abuse_animal",
  dead = "report.dead",
  childrens = "report.childrens",
  copyright = "report.copyright",
  collective_disrespect = "report.collective_disrespect",
  personal_disrespect = "report.personal_disrespect",
  fake_news = "report.fake_news",
  spelling_mistakes = "report.spelling_mistakes",
  bug = "report.bug",
  btn = "report.btn",
  successHeader = "report.successHeader",
  successMessage = "report.successMessage"
}

@Component({
  selector: "app-report-comment",
  templateUrl: "./report-comment.component.html",
  styleUrls: ["./report-comment.component.scss"],
})
export class ReportCommentComponent implements OnInit {
  @Input() comment: IComment;
  public Texts = Texts;

  reason = null;

  options = [
    {
      type: "sex",
      text: Texts.sex,
    },
    {
      type: "violence",
      text: Texts.violence,
    },
    {
      type: "pedophilia",
      text: Texts.pedophilia,
    },
    {
      type: "abuse_person",
      text: Texts.abuse_person,
    },
    {
      type: "abuse_animal",
      text: Texts.abuse_animal,
    },
    {
      type: "dead",
      text: Texts.dead,
    },
    {
      type: "childrens",
      text: Texts.childrens,
    },
    {
      type: "copyright",
      text: Texts.copyright,
    },
    {
      type: "collective_disrespect",
      text: Texts.collective_disrespect,
    },
    {
      type: "personal_disrespect",
      text: Texts.personal_disrespect,
    },
    {
      type: "fake_news",
      text: Texts.fake_news,
    },
    {
      type: "spelling_mistakes",
      text: Texts.spelling_mistakes,
    },
    {
      type: "bug",
      text: Texts.bug,
    },
  ];

  constructor(
    public readonly modalCtrl: ModalController,
    private readonly userService: UserService,
    private readonly reportService:ReportService,
    private readonly loadingService:LoadingService,
    private readonly alertCtrl:AlertController,
    private readonly translate:TranslateService
  ) {}

  ngOnInit() {
    console.log(this.comment)
  }

  createReport() {
    let report = {
      comment: this.comment._id,
      reason: this.reason,
      user: this.userService.User?._id,
    };
    this.loadingService.present()
    this.reportService.createReport(report).subscribe((report)=>{
      this.success()
      this.loadingService.dismiss()
      this.modalCtrl.dismiss()
    },()=>{
      this.loadingService.dismiss()
    })
  }
  
  async success() {
    const alert = await this.alertCtrl.create({
      header:this.translate.instant(Texts.successHeader),
      message:this.translate.instant(Texts.successMessage),
      buttons:[{text:this.translate.instant("accept")}]
    })
    return await alert.present()
  }
}
