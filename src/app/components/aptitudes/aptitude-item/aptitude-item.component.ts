import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Aptitude, AptitudesService } from "src/app/service/aptitudes.service";
import { UserService } from "src/app/service/user.service";
import { CreateAptitudeComponent } from "../create-aptitude/create-aptitude.component";

enum Texts {
  deleteHeader = "Eliminar aptitud",
  deleteMessage = "Seguro desea eliminar esta aptitud",
  cancelMessage = "cancel",
  deleteAccept = "Si, eliminar",
}
@Component({
  selector: "aptitude-item",
  templateUrl: "./aptitude-item.component.html",
  styleUrls: ["./aptitude-item.component.scss"],
})
export class AptitudeItemComponent implements OnInit {
  @Input() aptitude: Aptitude;
  constructor(
    public readonly userService: UserService,
    private readonly aptitudeService: AptitudesService,
    private readonly cd: ChangeDetectorRef,
    private readonly translate: TranslateService,
    private readonly alertCtrl: AlertController,
    private readonly modalCtrl:ModalController
  ) {}

  ngOnInit() {}

  async delete() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.deleteHeader),
      message: this.translate.instant(Texts.deleteMessage),
      buttons: [
        {
          text: this.translate.instant(Texts.cancelMessage),
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: this.translate.instant(Texts.deleteAccept),
          handler: () => {
            this.aptitudeService.delete(this.aptitude._id).subscribe(() => {
              this.aptitude.deleted = true;
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   *
   * Abre una ventana modal para editar la aptitude
   */

  async edit() {
    this.cd.detectChanges();

    // nos suscribimos a un observable, para escuchar cuando se edite una experiencia
    this.aptitudeService.editedItem$.asObservable().subscribe((aptitude) => {
      console.log(aptitude);
      
      // si es la misma experiencia de este componente, la reemplazamos
      if (this.aptitude._id == aptitude._id) {
        this.aptitude = aptitude;
      }
    });
    let modal = await this.modalCtrl.create({
      component: CreateAptitudeComponent,
      componentProps: { aptitude: this.aptitude },
      cssClass: "modal-border",
    });

    return await modal.present();
  }
}
