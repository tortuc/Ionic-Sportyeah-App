import { ModalController } from "@ionic/angular";
import { OpenImgComponent } from "./../../components/open-img/open-img.component";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service";
// import { BannerLogic } from "./../../service/banner-profile-logic.service";

@Component({
  selector: "app-carrousel",
  templateUrl: "./carrousel.component.html",
  styleUrls: ["./carrousel.component.scss"],
})
export class CarrouselComponent implements OnInit {
  constructor(
    // public bannerLogic          : BannerLogic,
    public router               : Router,
    public userService          : UserService,
    public mc                   : ModalController,
    public route                : ActivatedRoute,
    public reusableCI           : ReusableComponentsIonic
  ) {}
  goTo(ruta: string) {
    this.router.navigate([ruta]);
  }
  async open(img: string) {
    if(this.slider.length < 1) this.slider.push("https://trello-attachments.s3.amazonaws.com/5ff9d47572424648014190dc/700x422/29f3e5ed0cea0a6b7439bfb986a090cd/original.jpg")
    const modal = await this.mc.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser: this.route.snapshot.paramMap.get("username"),
        delete:false
      },
    });
    modal.present();
  }
  @Input() slider: any;
  ngOnInit() {}
  slideOpts = this.reusableCI.slideOpts
}
