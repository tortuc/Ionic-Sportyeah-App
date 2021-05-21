import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IExperience } from "src/app/models/IExperience";
import { ExperienceService } from "src/app/service/experience.service";
import { UserService } from "src/app/service/user.service";
import { CreateExperienceComponent } from "../../create-experience/create-experience.component";

@Component({
  selector: "experience-item",
  templateUrl: "./experience-item.component.html",
  styleUrls: ["./experience-item.component.scss"],
})
export class ExperienceItemComponent implements OnInit {
  @Input() experience: IExperience;
  constructor(
    private readonly modalCtrl: ModalController,
    public readonly experienceService: ExperienceService,
    public readonly userService: UserService,
    private readonly translate: TranslateService,
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {}

  async delete() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("experience.deleteModal.alert"),
      message: this.translate.instant("experience.deleteModal.confirm"),
      buttons: [
        {
          text: this.translate.instant("experience.deleteModal.cancel"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: this.translate.instant("experience.deleteModal.accept"),
          handler: () => {
            this.experienceService.delete(this.experience._id).subscribe(() => {
              this.experience.deleted = true;
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   *
   * Abre una ventana modal para editar la experiencia
   */

  async edit() {
    // nos suscribimos a un observable, para escuchar cuando se edite una experiencia
    this.experienceService.editedExperience$
      .asObservable()
      .subscribe((experience) => {
        // si es la misma experiencia de este componente, la reemplazamos
        if (this.experience._id == experience._id) {
          this.experience = experience;
        }
      });
    let modal = await this.modalCtrl.create({
      component: CreateExperienceComponent,
      componentProps: { experience: this.experience },
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
