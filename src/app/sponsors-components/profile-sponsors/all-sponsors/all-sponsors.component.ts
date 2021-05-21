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

enum Texts {
  cantEditHeader = "sponsors.allSponsors.cantEdit.header",
  cantEditMessage = "sponsors.allSponsors.cantEdit.message",
  deleteHeader = "sponsors.allSponsors.delete.header",
  deleteMessage = "sponsors.allSponsors.delete.message",
  workingHeader = "working.header",
  workingMessage = "working.message",
  loading = "loading",
  cancel = "cancel",
  accept = "accept",
  titleMine = "sponsors.allSponsors.title_mine",
  titleOther = "sponsors.allSponsors.title_other",
  optionsBtn = "sponsors.allSponsors.btn",
}

enum options {
  delete = "delete",
  analytic = "analytic",
  edit = "edit",
}
@Component({
  selector: "app-all-sponsors",
  templateUrl: "./all-sponsors.component.html",
  styleUrls: ["./all-sponsors.component.scss"],
})
export class AllSponsorsComponent implements OnInit {
  public readonly Texts = Texts;

  @Input() user: User;
  sponsors: ISponsor[] = [];

  constructor(
    private readonly sponsorService: SponsorService,
    public readonly userService: UserService,
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
  handleOptions(data: options, sponsor: ISponsor) {
    switch (data) {
      case options.delete:
        this.delete(sponsor);
        break;
      case options.analytic:
        this.analytics(sponsor);
        break;
      case options.edit:
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
      header: this.translate.instant(Texts.cantEditHeader),
      message: this.translate.instant(Texts.cantEditMessage),
      buttons: [
        {
          text: this.translate.instant(Texts.accept),
        },
      ],
    });

    alert.present();
  }

  async analytics(sponsor: ISponsor) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.workingHeader),
      message: this.translate.instant(Texts.workingMessage),
      buttons: [
        {
          text: this.translate.instant(Texts.accept),
        },
      ],
    });

    alert.present();
  }

  async delete(sponsor: ISponsor) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.deleteHeader),
      message: this.translate.instant(Texts.deleteMessage),
      buttons: [
        {
          text: this.translate.instant(Texts.cancel),
          role: "cancel",
        },
        {
          text: this.translate.instant(Texts.accept),
          handler: async () => {
            let loading = await this.loadingCtrl.create({
              message: this.translate.instant(Texts.loading),
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
