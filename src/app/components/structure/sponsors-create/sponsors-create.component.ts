import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ISponsor } from "src/app/models/ISponsor";
import { ImagePickerComponent } from "src/app/shared-components/image-picker/image-picker.component";
import { JdvimageService } from "src/app/service/jdvimage.service";

@Component({
  selector: "app-sponsors-create",
  templateUrl: "./sponsors-create.component.html",
  styleUrls: ["./sponsors-create.component.scss"],
})
export class SponsorsCreateComponent implements OnInit {
  @Input() edit: ISponsor;
  @ViewChild("openImage") openImage: ElementRef;

  constructor(
    public fb: FormBuilder,
    public reusableCI: ReusableComponentsIonic,
    public reusableIMG: ImgVideoUpload,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public fileService: JdvimageService
  ) {}

  /*
   *  @pattern del url
   *  " and / pueden causar problemas si se pasan directamente al
   *  pattern por eso coloco una variable separada
   */
  reg: string = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

  form: FormGroup = this.fb.group({
    url: ["", [Validators.required, Validators.pattern(this.reg)]],
    name: ["", [Validators.required]],
    image: ["", [Validators.required]],
  });

  ngOnInit() {
    console.log(this.modalCtrl);
    
    this.form.controls.url.setValue(this.edit.url);
    this.form.controls.image.setValue(this.edit.image);
    this.form.controls.name.setValue(this.edit.name);
  }

  /*
   * Add image
   */
  async add() {
    let action = await this.actionSheetCtrl.create({
      header: "Subir una imagen para el patrocinador",
      buttons: [
        {
          text: "Galeria",
          icon: "images",
          handler: () => {
            this.openImage.nativeElement.click();
          },
        },
        {
          text: "AÑADIR IMAGEN GRATUITA",
          icon: "globe",
          handler: () => {
            this.freeImage();
          },
        },
        {
          text: "cancelar",
          role: "cancel",
        },
      ],
    });

    action.present();
    // this.reusableIMG.takeOnlyPhoto();
    // this.reusableIMG.content
    //   .pipe(take(1))
    //   .subscribe((r: string) => this.form.controls.image.setValue(r));
  }

  /*
   * Envia el nuevo patrocinador
   */
  send() {
    
    this.modalCtrl.dismiss(this.form.value);
    this.reusableCI.toast(`Patrocinador creado con éxito`);
  }

  async freeImage() {
    let modal = await this.modalCtrl.create({
      component:ImagePickerComponent
    })
    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined && "image" in data.data) {
        this.fileService
          .uploadImageFromUrl(data.data.image.largeImageURL)
          .then((url: string) => {
            this.form.controls.image.setValue(url);
          });
      }
    });

    modal.present();
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formData).then((url: string) => {
      this.form.controls.image.setValue(url);
    });
  }
}
