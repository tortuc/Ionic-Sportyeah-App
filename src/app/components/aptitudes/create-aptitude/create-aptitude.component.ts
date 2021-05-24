import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Aptitude, AptitudesService } from "src/app/service/aptitudes.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "aptitudes.create",
  edit = "aptitudes.edit",
  btn = "aptitudes.btn",
  btnEdit = "aptitudes.btnEdit",
}

@Component({
  selector: "app-create-aptitude",
  templateUrl: "./create-aptitude.component.html",
  styleUrls: ["./create-aptitude.component.scss"],
})
export class CreateAptitudeComponent implements OnInit {
  public readonly Texts = Texts;
  form: FormGroup = null;

  @Input() aptitude: Aptitude = null;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    public aptitudesService: AptitudesService,
    public userService: UserService,
    public router: Router,
    public readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.aptitude !== null
      ? this.generateFormEdit()
      : this.generateFormCreate();
  }

  generateFormCreate() {
    this.form = this.fb.group({
      userId: [this.userService.User._id],
      title: ["", [Validators.required]],
      score: ["", [Validators.required]],
      date: [new Date()],
      deleted: [false],
    });
  }

  generateFormEdit() {
    this.form = this.fb.group({
      title: [this.aptitude.title, [Validators.required]],
      score: [this.aptitude.score, [Validators.required]],
    });
  }

  save() {
    let aptitude = this.form.value;
    this.aptitude === null
      ? this.aptitudesService.create(aptitude)
      : this.aptitudesService.edit(this.aptitude._id, aptitude);
    this.modalCtrl.dismiss();
  }
}
