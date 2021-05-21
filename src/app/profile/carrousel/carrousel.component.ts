import { OpenImgComponent } from "./../../components/open-img/open-img.component";
import { ModalController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service";
// import { BannerLogic } from "./../../service/banner-profile-logic.service";

@Component({
  selector: "app-carrousel",
  templateUrl: "./carrousel.component.html",
  styleUrls: ["./carrousel.component.scss"],
})
export class CarrouselComponent implements OnInit {
  constructor(
    // public bannerLogic: BannerLogic,
    public router             : Router,
    public userService        : UserService,
    public modalCtrl                 : ModalController,
    public reusableCI         : ReusableComponentsIonic
  ) {}
  goTo(ruta: string) {
    this.router.navigate([ruta]);
  }
  async open(img: string) {
    const modal = await this.modalCtrl.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser: this.userService.User.username,
        delete: false,
      },
    });
    modal.present();
  }
  ngOnInit() {}
  slideOpts = this.reusableCI.slideOpts
}
