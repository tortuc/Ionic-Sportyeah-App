import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ICategory, ITeam } from "src/app/models/structure.model";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "create_team.title",
  edit = "create_team.edit",
  btnCreate = "create_team.btnCreate",
  save = "create_team.save",
  name = "create_team.name",
  description = "create_team.description",
  image = "create_team.image",
}

@Component({
  selector: "app-create-team",
  templateUrl: "./create-team.component.html",
  styleUrls: ["./create-team.component.scss"],
})
export class CreateTeamComponent implements OnInit {
  @Input() team: ITeam = null;
  @Input() category: ICategory = null;

  public readonly Texts = Texts;
  constructor(
    public readonly modalCtrl: ModalController,
    private readonly structureService: StructureService,
    private readonly fb: FormBuilder,
    private readonly fileService: FilesService
  ) {}

  form = this.fb.group({
    name: ["", [Validators.required]],
    description: [""],
    image: ["assets/structure/team.jpg", [Validators.required]],
    category: [null, [Validators.required]],
  });

  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.image.setValue(url);
    });
  }

  ngOnInit() {
    if (this.category) {
      this.form.controls.category.setValue(this.category._id);
    }

    if (this.team) {
      this.setValues();
    }
  }

  setValues() {
    this.form = this.fb.group({
      image: [this.team.image, [Validators.required]],
      name: [this.team.name, [Validators.required]],
      description: [this.team.description],
    });
  }

  save() {
    let team = this.form.value;

    if (this.team) {
      delete team.category;
      this.structureService.updateTeam(this.team._id, team);
    } else {
      this.structureService.createTeam(team);
    }
    this.modalCtrl.dismiss();
  }
}
