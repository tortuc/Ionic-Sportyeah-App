import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IDivision } from "src/app/models/structure.model";
import { LoadingService } from "src/app/service/loading.service";
import {  StructureService } from "src/app/service/structure.service";
import { CreateDivisionComponent } from "../create-division/create-division.component";
import { DivisionOptionsComponent } from "./division-options/division-options.component";

enum options {
  edit = "edit",
  delete = "delete",
  see = "see",
}

enum Texts {
  header = "delete_division.header",
  message = "delete_division.message",
  accept = "delete_division.accept",
}

@Component({
  selector: "division-card",
  templateUrl: "./division-card.component.html",
  styleUrls: ["./division-card.component.scss"],
})
export class DivisionCardComponent implements OnInit {
  @Input() division: IDivision;

  constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly structureService: StructureService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService,
    private readonly loading: LoadingService
  ) {}

  ngOnInit() {}

  async options(event) {
    const popover = await this.popoverCtrl.create({
      component: DivisionOptionsComponent,
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
            this.structureService
              .deleteDivisionById(this.division._id)
              .subscribe(
                () => {
                  this.loading.dismiss();
                  this.division.deleted = true;
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
    this.structureService.updatedDivision$.subscribe((division) => {
      this.division =
        this.division._id == division._id ? division : this.division;
    });
    const modal = await this.modalCtrl.create({
      component: CreateDivisionComponent,
      componentProps: { division: this.division },
      cssClass: "modal-border",
    });
    return await modal.present();
  }

  goto() {
    this.router.navigate([`profile/structure/divisions/${this.division._id}`]);
  }
}
