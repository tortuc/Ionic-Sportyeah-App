import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { StructureService } from "src/app/service/structure.service";

enum Texts {
  title = "Edita la informacion de tu club",
  name = "Nombre de tu club",
  description = "Descripcion de tu club",
  date = "Fecha en que se fundo tu club",
  socialNetworks = "Enlaces a tus redes sociales",
  save = "Guardar cambios",
}

@Component({
  selector: "edit-structure-info",
  templateUrl: "./edit-structure-info.component.html",
  styleUrls: ["./edit-structure-info.component.scss"],
})
export class EditStructureInfoComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    public readonly modalCtrl: ModalController,
    private fb: FormBuilder,
    private readonly structureService: StructureService,
    private readonly loadingCtrl: LoadingController,
    private readonly translate: TranslateService
  ) {}

  private readonly myStructure = this.structureService.myStructure;

  form = this.fb.group({
    name: [this.myStructure.name, [Validators.required]],
    description: [this.myStructure.description, [Validators.required]],
    date: [
      moment(this.myStructure.date).format("YYYY-MM-DD"),
      [Validators.required],
    ],
  });

  formSocialNetworks = this.fb.group({
    tiktok: [this.myStructure.socialNetworks.tiktok],
    facebook: [this.myStructure.socialNetworks.facebook],
    twitter: [this.myStructure.socialNetworks.twitter],
    linkedin: [this.myStructure.socialNetworks.linkedin],
    instagram: [this.myStructure.socialNetworks.instagram],
  });

  ngOnInit() {}

  async save() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });

    loading.present();
    let structure = this.form.value;
    structure.socialNetworks = this.formSocialNetworks.value;
    this.structureService
      .editMyStructure(structure)
      .then(() => {
        loading.dismiss();
        this.modalCtrl.dismiss(true);
      })
      .catch(() => {
        loading.dismiss();
      });
  }
}
