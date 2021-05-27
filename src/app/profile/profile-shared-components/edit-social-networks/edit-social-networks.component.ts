import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "socialNetworks.edit.title",
  save = "socialNetworks.edit.save",
}
@Component({
  selector: "app-edit-social-networks",
  templateUrl: "./edit-social-networks.component.html",
  styleUrls: ["./edit-social-networks.component.scss"],
})
export class EditSocialNetworksComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    public readonly modalCtrl: ModalController,
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly loadingCtrl: LoadingController,
    private readonly translate: TranslateService
  ) {}

  form = this.fb.group({
    tiktok: [""],
    facebook: [""],
    twitter: [""],
    linkedin: [""],
    instagram: [""],
  });

  async save() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.userService.update({ socialNetworks: this.form.value }).subscribe(
      (user) => {
        this.userService.User = user;
        this.modalCtrl.dismiss();
        loading.dismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }
  ngOnInit() {
    let { socialNetworks } = this.userService.User;
    this.form.controls.tiktok.setValue(socialNetworks.tiktok);
    this.form.controls.facebook.setValue(socialNetworks.facebook);
    this.form.controls.instagram.setValue(socialNetworks.instagram);
    this.form.controls.twitter.setValue(socialNetworks.twitter);
    this.form.controls.linkedin.setValue(socialNetworks.linkedin);
  }
}
