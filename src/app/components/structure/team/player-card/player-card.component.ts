import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IOrganization, IPlayer } from "src/app/models/structure.model";
import { LoadingService } from "src/app/service/loading.service";
import { StructureService } from "src/app/service/structure.service";
import { CreatePlayerComponent } from "./create-player/create-player.component";

enum Texts {
  from = "executive_card.from",
  deleteHeader = "executive_card.deleteHeader",
  deleteMessage = "executive_card.deleteMessage",
  accept = "executive_card.accept",
}
@Component({
  selector: "player-card",
  templateUrl: "./player-card.component.html",
  styleUrls: ["./player-card.component.scss"],
})
export class PlayerCardComponent implements OnInit {
  public readonly Texts = Texts;
  @Input() profile: IPlayer;
  @Input() private: boolean = false;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly structureService: StructureService,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  public visit() {
    this.router.navigate([`/structure/player/${this.profile._id}`]);
  }

  async edit() {
    this.structureService.playerUpdated$.subscribe((profile) => {
      this.profile = this.profile._id == profile._id ? profile : this.profile;
    });
    const modal = await this.modalCtrl.create({
      component: CreatePlayerComponent,
      componentProps: { player: this.profile },
      cssClass: "modal-border",
    });

    return await modal.present();
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.deleteHeader),
      message: this.translate.instant(Texts.deleteMessage),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant(Texts.accept),
          handler: () => {
            this.loadingService.present();
            this.structureService.deletePlayer(this.profile._id).subscribe(
              () => {
                this.loadingService.dismiss();
                this.profile.deleted = true;
              },
              () => {
                this.loadingService.dismiss();
              }
            );
          },
        },
      ],
    });
    alert.present();
  }
}
