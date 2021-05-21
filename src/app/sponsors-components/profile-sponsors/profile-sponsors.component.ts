import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ISponsor } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";
import { SponsorService } from "src/app/service";
import { UserService } from "src/app/service/user.service";
import { SponsorsCreateComponent } from "../sponsors-create/sponsors-create.component";
import { AllSponsorsComponent } from "./all-sponsors/all-sponsors.component";

enum Texts {
  privateTitle = "sponsors.private_profile.title",
  publicTitle = "sponsors.public_profile.title",
  btnAdd = "sponsors.private_profile.add",
  btnAll = "sponsors.private_profile.all",
}

@Component({
  selector: "profile-sponsors",
  templateUrl: "./profile-sponsors.component.html",
  styleUrls: ["./profile-sponsors.component.scss"],
})
export class ProfileSponsorsComponent implements OnInit {
  public readonly Texts = Texts;

  @Input() user: User;
  constructor(
    private sponsorService: SponsorService,
    public userService: UserService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getSponsors();
  }

  public sponsors: ISponsor[] = [];

  public loading = false;
  /**
   * Obtiene todos los patrocinadores del usuario
   */
  getSponsors() {
    this.loading = true;
    this.sponsorService
      .getAllSponsorsUserById(this.user._id)
      .pipe(take(1))
      .subscribe(
        (sponsors) => {
          this.loading = false;
          this.sponsors = sponsors;
          if (sponsors.length > 3) {
            this.rotateSponsors();
          }
        },
        (error) => {
          this.loading = false;
          // handle error
        }
      );
  }
  rotateSponsors() {
    setInterval(() => {
      this.sponsors.unshift(this.sponsors.pop());
    }, 3000);
  }

  /**
   * Despliega una ventana modal para crear un patrocinador
   */
  async createSponsor() {
    const modal = await this.modalCtrl.create({
      component: SponsorsCreateComponent,
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then((data) => {
      if (data.data?.new) {
        this.sponsors.push(data.data.newSponsor);
        if (this.sponsors.length > 3) {
          this.rotateSponsors();
        }
      }
    });
    return await modal.present();
  }

  async seeAll() {
    let modal = await this.modalCtrl.create({
      component: AllSponsorsComponent,
      componentProps: { user: this.user },
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then(() => {
      this.getSponsors();
    });
    await modal.present();
  }
}
