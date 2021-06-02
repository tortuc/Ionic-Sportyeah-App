import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LoadingService } from "src/app/service/loading.service";
import { StructureService } from "src/app/service/structure.service";
import { PopoverOptionsComponent } from "../../popover-options/popover-options.component";
import { CreateTeamComponent } from "../create-team/create-team.component";

enum Texts {
  see = "Ver Equpo",
  edit = "Editar",
  delete = "Eliminar",
  header = "Eliminar equipo",
  message = "Seguro deseas eliminar este equipo? se perderan los jugadores y cuerpo tecnico asociados!",
  accept = "Si, eliminar",
}

const popoverOtions = [
  {
    icon: "eye-outline",
    text: Texts.see,
    action: "see",
  },
  {
    icon: "create-outline",
    text: Texts.edit,
    action: "edit",
  },
  {
    icon: "trash-bin-outline",
    text: Texts.delete,
    action: "delete",
  },
];
enum options {
  edit = "edit",
  delete = "delete",
  see = "see",
}
@Component({
  selector: "team-card",
  templateUrl: "./team-card.component.html",
  styleUrls: ["./team-card.component.scss"],
})
export class TeamCardComponent implements OnInit {
  @Input() team;
  @Input() private: boolean = false;
  constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService,
    private readonly loading: LoadingService,
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  async options(event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverOptionsComponent,
      componentProps: { options: popoverOtions },
      event,
      showBackdrop: false,
    });

    popover.onDidDismiss().then((response) => {
      let option = response.data;
      this.handlerOptions(option);
    });
    popover.present();
  }
  handlerOptions(option: options) {
    switch (option) {
      case options.see:
        this.goto();
        break;
      case options.edit:
        this.edit();
        break;

      case options.delete:
        this.delete();
        break;

      default:
        break;
    }
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.header),
      message: this.translate.instant(Texts.message),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant(Texts.accept),
          handler: () => {
            this.loading.present();
            this.structureService.deleteTeam(this.team._id).subscribe(
              () => {
                this.loading.dismiss();
                this.team.deleted = true;
              },
              () => {
                this.loading.dismiss();
              }
            );
          },
        },
      ],
    });
    alert.present();
  }

  async edit() {
    this.structureService.teamUpdated$.subscribe((team) => {
      this.team = this.team._id == team._id ? team : this.team;
    });
    const modal = await this.modalCtrl.create({
      component: CreateTeamComponent,
      componentProps: { team: this.team },
      cssClass: "modal-border",
    });
    return await modal.present();
  }

  goto() {
    if (this.private) {
      this.router.navigate([`profile/structure/team/${this.team._id}`]);
    } else {
      this.router.navigate([`structure/team/${this.team._id}`]);
    }
  }
}
