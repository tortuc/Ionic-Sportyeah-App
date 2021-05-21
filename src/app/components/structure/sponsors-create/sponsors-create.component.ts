import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ISponsor, ISponsorInfo } from "src/app/models/ISponsor";
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

  public customSponsor: ISponsorInfo = {
    name: "SportYeah",
    url: "app.sportyeah.com",
    miniature: "assets/sponsors/default_mini.jpg",
    profile_image: "assets/sponsors/default_profile.jpg",
  };

  ngOnInit() {}

  /*
   * Crea un patrocinador
   */
  create() {
    let sponsor: ISponsor = {
      user: this.userService.User._id,
    };

    sponsor.idSponsor =
      this.sponsorSelected != null ? this.sponsorSelected._id : null;

    this.sponsorService.createSponsor(sponsor).subscribe((newSponsor) => {
      this.modalCtrl.dismiss({ new: true, newSponsor });
    });
  }



  sponsorSelected: User = null;

  setSponsor(sponsor: User) {
    this.sponsorSelected = sponsor;
  }

  upload_option: "miniature" | "profile" = "miniature";
  uploadFile(event) {
    let option = this.upload_option;
    let form = new FormData();
    form.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(form).then((url: string) => {
      switch (option) {
        case "miniature":
          this.customSponsor.miniature = url;
          break;
        case "profile":
          this.customSponsor.profile_image = url;
          break;

        default:
          break;
      }
    });
  }
}
