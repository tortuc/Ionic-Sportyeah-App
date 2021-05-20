import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ISponsor, ISponsorInfo } from "src/app/models/ISponsor";
import { TranslateService } from "@ngx-translate/core";
import { SponsorService } from "src/app/service";
import { User } from "src/app/models/IUser";
import { FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";
import { WishService } from "src/app/service/wish.service";

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
    private readonly userService: UserService,
    private readonly wishService: WishService
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

  ngOnInit() {
    this.previewUrl();
  }

  /*
   * Crea un patrocinador
   */
  create() {
    let sponsor: ISponsor = {
      user: this.userService.User._id,
    };

    if (this.noAccount) {
      sponsor.customSponsor = this.customSponsor;
    } else {
      sponsor.idSponsor =
        this.sponsorSelected != null ? this.sponsorSelected._id : null;
    }

    console.log(sponsor);
    
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

  preview = null;
  previewLoading = false;

  timeout = null;
  previewUrl() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      try {
        let string: string = this.customSponsor.url;
        let match = string.match(
          /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
        );

        if (match) {
          this.previewLoading = true;
          this.wishService
            .pageInfo(match[0])
            .toPromise()
            .then((info) => {
              this.previewLoading = false;
              this.preview = info;
            })
            .catch((err) => {
              this.previewLoading = false;
              this.preview = null;
            });
        } else {
          this.preview = null;
        }
      } catch (error) {
        // nothing to do
      }
    }, 1000);
  }
}
