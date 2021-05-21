import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { CustomizeSponsorComponent } from "./customize-sponsor/customize-sponsor.component";

@Component({
  selector: "custom-sponsor",
  templateUrl: "./custom-sponsor.component.html",
  styleUrls: ["./custom-sponsor.component.scss"],
})
export class CustomSponsorComponent implements OnInit {
  constructor(
    public userService: UserService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.verifyInfo();
  }

  /**
   * Verifica si el usuario patrocinador tiene informacion, si no tiene se crea una por defecto
   */
  verifyInfo() {
    if (!this.userService.User.sponsor_info) {
      let sponsor_info = {
        name: "SportYeah",
        miniature: "assets/sponsors/default_mini.jpg",
        profile_image: "assets/sponsors/default_profile.jpg",
      };
      this.userService.update({ sponsor_info }).subscribe((user) => {
        this.userService.User = user;
      });
    }
  }

  /**
   * Despliega una ventana modal para personalizar la tarjeta del patrocinador
   */
  async customCard() {
    let modal = await this.modalCtrl.create({
      component:CustomizeSponsorComponent,
      cssClass:"modal-border"
    })
    modal.present()
  }
}
