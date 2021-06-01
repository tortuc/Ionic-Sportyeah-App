import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { User } from "src/app/models/IUser";
import { IOrganization } from "src/app/models/structure.model";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "organizationChart.create.title",
  edit = "organizationChart.create.edit",
  changeImg = "organizationChart.create.changeImg",
  name = "organizationChart.create.name",
  position = "organizationChart.create.position",
  description = "organizationChart.create.description",
  date = "organizationChart.create.date",
  history = "organizationChart.create.history",
  create = "organizationChart.create.create",
  save = "organizationChart.create.save",
  user = "organizationChart.create.user",
  cancelUser = "organizationChart.create.cancelUser",
}

@Component({
  selector: "app-create-profile-org",
  templateUrl: "./create-profile-org.component.html",
  styleUrls: ["./create-profile-org.component.scss"],
})
export class CreateProfileOrgComponent implements OnInit {
  @Input() profile: IOrganization = null;
  public readonly Texts = Texts;
  constructor(
    public readonly modalCtrl: ModalController,
    private readonly structureService: StructureService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly translate: TranslateService,
    private readonly fileService: FilesService
  ) {}

  form = this.fb.group({
    photo: ["assets/structure/president.jpg", [Validators.required]],
    name: ["", [Validators.required]],
    position: ["", [Validators.required]],
    description: ["", [Validators.required]],
    date: [new Date(), [Validators.required]],
    history: ["", [Validators.required]],
    structure: [this.structureService.myStructure._id, [Validators.required]],
  });

  ngOnInit() {
    if (this.profile) {
      this.setValues();
    }
  }

  public user: User = null;
  public users: User[] = [];
  filter(ev) {
    const { value } = ev.detail;
    if (value) {
      this.userService.queryUsers(ev.detail.value).subscribe((users) => {
        this.users = users;
      });
    } else {
      this.users = [];
    }
  }

  setUser(user) {
    this.user = user;
  }

  setValues() {
    this.form = this.fb.group({
      photo: [this.profile.photo, [Validators.required]],
      name: [this.profile.name, [Validators.required]],
      position: [this.profile.position, [Validators.required]],
      description: [this.profile.description, [Validators.required]],
      date: [moment(this.profile.date).format("YYYY-MM-DD")],
      history: [this.profile.history, [Validators.required]],
    });

    this.user = this.profile.user;
  }

  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.photo.setValue(url);
    });
  }

  save() {
    let profile = this.form.value;
    profile.user = this.user != null ? this.user._id : null;

    if (this.profile) {
      this.structureService.updateProfileOrganizationById(
        this.profile._id,
        profile
      );
    } else {
      this.structureService.createProfileOrganization(profile);
    }
    this.modalCtrl.dismiss();
  }
}
