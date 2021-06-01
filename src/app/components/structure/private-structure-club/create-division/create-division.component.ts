import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { IDivision } from "src/app/models/structure.model";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";

enum Texts {
  title = "create_division.title",
  edit = "create_division.edit",
  btnCreate = "create_division.btnCreate",
  save = "create_division.save",
  name = "create_division.name",
  description = "create_division.description",
  image = "create_division.image",
}

@Component({
  selector: "app-create-division",
  templateUrl: "./create-division.component.html",
  styleUrls: ["./create-division.component.scss"],
})
export class CreateDivisionComponent implements OnInit {
  @Input() division: IDivision = null;

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
    image: ["assets/structure/sports.jpg", [Validators.required]],
    structure: [this.structureService.myStructure._id, [Validators.required]],
  });

  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.image.setValue(url);
    });
  }

  ngOnInit() {
    if (this.division) {
      this.setValues();
    }
  }

  setValues() {
    this.form = this.fb.group({
      image: [this.division.image, [Validators.required]],
      name: [this.division.name, [Validators.required]],
      description: [this.division.description, [Validators.required]],
    });
  }

  save() {
    let division = this.form.value;

    if (this.division) {
      this.structureService.updateDivisionById(this.division._id, division);
    } else {
      this.structureService.createDivision(division);
    }
    this.modalCtrl.dismiss();
  }
}
