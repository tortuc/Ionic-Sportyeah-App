import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ICategory, IDivision } from "src/app/models/structure.model";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "Crear categoria",
  edit = "Editar categoria",
  btnCreate = "Crear categoria",
  save = "Guardar cambios",
  name = "Nombre de la categoria",
  description = "Breve descripcion de la categoria",
  image = "Cambiar imagen de la categoria",
}
@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent implements OnInit {
  @Input() division: IDivision = null;
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
    image: ["assets/structure/category.jpg", [Validators.required]],
    division: [null, [Validators.required]],
  });

  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.image.setValue(url);
    });
  }

  ngOnInit() {
    console.log(this.category);

    if (this.division) {
      this.form.controls.division.setValue(this.division._id);
    }

    if (this.category) {
      this.setValues();
    }
  }

  setValues() {
    this.form = this.fb.group({
      image: [this.category.image, [Validators.required]],
      name: [this.category.name, [Validators.required]],
      description: [this.category.description]
    });
  }

  save() {
    let category = this.form.value;

    if (this.category) {
      delete category.division;
      this.structureService.updateCategory(this.category._id, category);
    } else {
      this.structureService.createCategory(category);
    }
    this.modalCtrl.dismiss();
  }
}
