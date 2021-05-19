import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { SponsorsCreateComponent } from "src/app/components/structure/sponsors-create/sponsors-create.component";
import { ISponsor } from "src/app/models/ISponsor";
import { SponsorService } from "src/app/service";
import { UserService } from "src/app/service/user.service";
import { SponsorsComponent } from "../sponsors/sponsors.component";

@Component({
  selector: "profile-sponsors",
  templateUrl: "./profile-sponsors.component.html",
  styleUrls: ["./profile-sponsors.component.scss"],
})
export class ProfileSponsorsComponent implements OnInit {
  constructor(
    private sponsorService: SponsorService,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getSponsors();
  }

  public sponsors: ISponsor[] = [];

  /**
   * Obtiene todos los patrocinadores del usuario
   */
  getSponsors() {
    this.sponsorService
      .getAllSponsorsUserById(this.userService.User._id)
      .pipe(take(1))
      .subscribe(
        (sponsors) => {
          this.sponsors = sponsors;
          console.log(sponsors);
          
        },
        (error) => {
          // handle error
        }
      );
  }

  /**
   * Despliega una ventana modal para crear un patrocinador
   */
  async createSponsor() {
    const modal = await this.modalCtrl.create({
      component: SponsorsCreateComponent,
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
