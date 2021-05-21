import { Component, Input, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ISponsor } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";
import { SponsorService } from "src/app/service";
import { UserService } from "src/app/service/user.service";
import { EditSponsorComponent } from "./edit-sponsor/edit-sponsor.component";
import { SponsorOptionsComponent } from "./sponsor-options/sponsor-options.component";

@Component({
  selector: "app-all-sponsors",
  templateUrl: "./all-sponsors.component.html",
  styleUrls: ["./all-sponsors.component.scss"],
})
export class AllSponsorsComponent implements OnInit {
  @Input() user: User;
  sponsors: ISponsor[] = [];

  constructor(
    private readonly sponsorService: SponsorService,
    public userService: UserService,
    public readonly modalCtrl: ModalController,
    private readonly popoverCtrl: PopoverController,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService,
    private readonly loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getSponsors();
  }

  getSponsors() {
    this.sponsorService
      .getAllSponsorsUserById(this.user._id)
      .subscribe((sponsors) => {
        this.sponsors = sponsors;
      });
  }

  async options(event, sponsor) {
    let popover = await this.popoverCtrl.create({
      component: SponsorOptionsComponent,
      showBackdrop: false,
      event,
    });
    popover.onDidDismiss().then((response) => {
      this.handleOptions(response.data, sponsor);
    });
    popover.present();
  }
  handleOptions(data: any, sponsor: ISponsor) {
    switch (data) {
      case "delete":
        this.delete(sponsor);
        break;
      case "analytic":
        this.analytics(sponsor);
        break;
      case "edit":
        this.edit(sponsor);
        break;

      default:
        break;
    }
  }

  edit(sponsor: ISponsor) {
    if (sponsor.idSponsor != null) {
      this.cantEdit();
    } else {
      this.editSponsor(sponsor);
    }
  }

  /**
   * Modal para editar el sponsor
   * @param sponsor
   */
  async editSponsor(sponsor: ISponsor) {
    let modal = await this.modalCtrl.create({
      component: EditSponsorComponent,
      componentProps: { sponsor },
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then((response) => {
      if (response.data?.edit) {
        this.sponsors = response.data.sponsors;
      }
    });
    modal.present();
  }

  /**
   * Mensaje de que el patrocinador no se puede editar
   */
  async cantEdit() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("sponsors.allSponsors.cantEdit.header"),
      message: this.translate.instant("sponsors.allSponsors.cantEdit.message"),
      buttons: [
        {
          text: this.translate.instant("accept"),
        },
      ],
    });

    alert.present();
  }

  async analytics(sponsor: ISponsor) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("working.header"),
      message: this.translate.instant("working.message"),
      buttons: [
        {
          text: this.translate.instant("accept"),
        },
      ],
    });

    alert.present();
  }

  async delete(sponsor: ISponsor) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("sponsors.allSponsors.delete.header"),
      message: this.translate.instant("sponsors.allSponsors.delete.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant("accept"),
          handler: async () => {
            let loading = await this.loadingCtrl.create({
              message: this.translate.instant("loading"),
            });
            loading.present();
            this.sponsorService.deleteSponsor(sponsor._id).subscribe(
              (sponsors) => {
                this.sponsors = sponsors;
                loading.dismiss();
              },
              () => {
                loading.dismiss();
              }
            );
          },
        },
      ],
    });

    alert.present();
  }
}
