import { Component, OnInit } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ISponsorInfo } from "src/app/models/ISponsor";
import { FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-customize-sponsor",
  templateUrl: "./customize-sponsor.component.html",
  styleUrls: ["./customize-sponsor.component.scss"],
})
export class CustomizeSponsorComponent implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    private readonly userService: UserService,
    private readonly fileService: FilesService,
    private readonly loadingCtrl: LoadingController,
    private readonly translate: TranslateService
  ) {}

  copy_info: ISponsorInfo = {
    profile_image: null,
    name: null,
    miniature: null,
  };

  
  ngOnInit() {
    let { profile_image, name, miniature } = this.userService.User.sponsor_info;
    this.copy_info = { profile_image, name, miniature };
  }
  
  upload_option: "miniature" | "profile" = "miniature";
  uploadFile(event) {
    let option = this.upload_option;
    let form = new FormData();
    form.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(form).then((url: string) => {
      switch (option) {
        case "miniature":
          this.copy_info.miniature = url;
          break;
        case "profile":
          this.copy_info.profile_image = url;
          break;

        default:
          break;
      }
    });
  }

  async save() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.userService.update({ sponsor_info: this.copy_info }).subscribe(
      (user) => {
        loading.dismiss();
        this.userService.User = user;
        this.modalCtrl.dismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }
}
