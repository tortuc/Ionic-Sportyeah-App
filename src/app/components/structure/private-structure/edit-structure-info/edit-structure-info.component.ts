import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";

enum Texts {
  title = "private_structure.editmodal.title",
  name = "private_structure.editmodal.name",
  description = "private_structure.editmodal.description",
  date = "private_structure.editmodal.date",
  socialNetworks = "private_structure.editmodal.socialNetworks",
  save = "private_structure.editmodal.save",
  editlogo = "private_structure.editmodal.editlogo",
  hintlogo = "private_structure.editmodal.hintlogo",
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
    private readonly translate: TranslateService,
    private readonly fileService:FilesService
  ) {}

  private readonly myStructure = this.structureService.myStructure;

  form = this.fb.group({
    name: [this.myStructure.name, [Validators.required]],
    logo: [this.myStructure.logo, [Validators.required]],
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

  
  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.logo.setValue(url);
    });
  }
}
