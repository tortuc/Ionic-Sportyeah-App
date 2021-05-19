import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ISponsor } from "src/app/models/ISponsor";
import { ImagePickerComponent } from "src/app/shared-components/image-picker/image-picker.component";
import { TranslateService } from "@ngx-translate/core";
import { SponsorService } from "src/app/service";
import { User } from "src/app/models/IUser";
import { FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "sponsors-create",
  templateUrl: "./sponsors-create.component.html",
  styleUrls: ["./sponsors-create.component.scss"],
})
export class SponsorsCreateComponent implements OnInit {
  @Input() edit: ISponsor;

  @ViewChild("openImage") openImage: ElementRef;

  constructor(
    public fb: FormBuilder,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public fileService: FilesService,
    private sponsorService: SponsorService,
    private readonly translate: TranslateService,
    private readonly userService: UserService
  ) {}

  /*
   *  @pattern del url
   *  " and / pueden causar problemas si se pasan directamente al
   *  pattern por eso coloco una variable separada
   */
  reg: string = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

  public noAccount = false;

  form: FormGroup = this.fb.group({
    url: ["", [Validators.required, Validators.pattern(this.reg)]],
    name: ["", [Validators.required]],
    image: ["", [Validators.required]],
  });

  ngOnInit() {
    this.form.controls.url.setValue(this.edit.url);
    this.form.controls.image.setValue(this.edit.image);
    this.form.controls.name.setValue(this.edit.name);
  }

  /*
   * Agrega o sube una imagen para el patrocinador que se esta creando
   */
  async add() {
    // creamos un actionSheetController
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("sponsors.create.action.header"),
      buttons: [
        {
          text: this.translate.instant("sponsors.create.action.gallery"),
          icon: "images",
          handler: () => {
            this.openImage.nativeElement.click();
          },
        },
        {
          text: this.translate.instant("sponsors.create.action.free"),
          icon: "globe",
          handler: () => {
            this.freeImage();
          },
        },
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
      ],
    });
    // presentamos el actionSheet
    action.present();
  }

  /*
   * Crea un patrocinador
   */
  create() {
    let sponsor: ISponsor = {
      user: this.userService.User._id,
    };

    sponsor.idSponsor =
      this.sponsorSelected != null ? this.sponsorSelected._id : null;

   
    console.log(sponsor);

    this.sponsorService.createSponsor(sponsor).subscribe((newSponsor)=>{
      console.log(newSponsor);
      
    })
  }

  async freeImage() {
    let modal = await this.modalCtrl.create({
      component: ImagePickerComponent,
    });
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

  sponsorSelected: User = null;

  setSponsor(sponsor: User) {
    this.sponsorSelected = sponsor;
  }
}
