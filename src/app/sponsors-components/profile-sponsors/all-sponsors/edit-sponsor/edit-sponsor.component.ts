import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISponsor, ISponsorInfo } from "src/app/models/ISponsor";
import { SponsorService } from "src/app/service";
import { FilesService } from "src/app/service/files.service";
import { WishService } from "src/app/service/wish.service";

enum Texts {
  edit = "sponsors.customize.edit",
  name = "sponsors.customize.name",
  url = "sponsors.customize.url",
  loading = "sponsors.customize.loading",
  nopreview = "sponsors.customize.nopreview",
  miniature_ratio = "sponsors.customize.miniature_ratio",
  profile_ratio = "sponsors.customize.profile_ratio",
  change_btn = "sponsors.customize.change_btn",
  save = "sponsors.customize.save",
  title = "sponsors.custom.title",
  subtitle = "sponsors.custom.subtitle",
  btn = "sponsors.custom.btn",
}

enum uploadOptions {
  miniature = "miniature",
  profile = "profile",
}

@Component({
  selector: "app-edit-sponsor",
  templateUrl: "./edit-sponsor.component.html",
  styleUrls: ["./edit-sponsor.component.scss"],
})
export class EditSponsorComponent implements OnInit {
  public readonly Texts = Texts;
  @Input() sponsor: ISponsor;

  constructor(
    private wishService: WishService,
    private fileService: FilesService,
    private sponsorService: SponsorService,
    public modalCtrl: ModalController
  ) {}

  copy_info: ISponsorInfo = {
    profile_image: null,
    name: null,
    miniature: null,
    url: null,
  };

  ngOnInit() {
    let { profile_image, name, miniature, url } = this.sponsor.customSponsor;
    this.copy_info = { profile_image, name, miniature, url };
  }

  public readonly uploadOptions = uploadOptions;

  upload_option: uploadOptions = uploadOptions.miniature;
  uploadFile(event) {
    let option = this.upload_option;
    let form = new FormData();
    form.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(form).then((url: string) => {
      switch (option) {
        case uploadOptions.miniature:
          this.copy_info.miniature = url;
          break;
        case uploadOptions.profile:
          this.copy_info.profile_image = url;
          break;

        default:
          break;
      }
    });
  }

  save() {
    let sponsor = this.sponsor;
    sponsor.customSponsor = this.copy_info;
    this.sponsorService
      .editSponsor(sponsor._id, sponsor)
      .subscribe((sponsors) => {
        this.modalCtrl.dismiss({ edit: true, sponsors });
      });
  }

  preview = null;
  previewLoading = false;

  timeout = null;
  previewUrl() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      try {
        let string: string = this.copy_info.url;
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
