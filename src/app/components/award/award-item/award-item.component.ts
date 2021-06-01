import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ExperienceItemPreviewFilesComponent } from "src/app/experiences/experience/experience-item/experience-item-preview-files/experience-item-preview-files.component";
import { Awards, AwardService } from "src/app/service/awards.service";
import { UserService } from "src/app/service/user.service";
import { CreateAwardComponent } from "../awards/create-award/create-award.component";

enum Texts {
  deleteHeader = "awards.delete.header",
  deleteMessage = "awards.delete.message",
  deleteAccept = "awards.delete.accept",
  cancelMessage = "cancel",
}
@Component({
  selector: "award-item",
  templateUrl: "./award-item.component.html",
  styleUrls: ["./award-item.component.scss"],
})
export class AwardItemComponent implements OnInit {
  @Input() award: Awards;
  @ViewChild("filesPreview") filesPreview: ExperienceItemPreviewFilesComponent;

  constructor(
    public readonly userService: UserService,
    public readonly awardService: AwardService,
    private readonly alertController: AlertController,
    private readonly translate: TranslateService,
    private readonly cd: ChangeDetectorRef,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async delete() {
    const alert = await this.alertController.create({
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
            this.awardService.delete(this.award._id).subscribe(() => {
              this.award.deleted = true;
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   *
   * Abre una ventana modal para editar la award
   */

  async edit() {
    this.cd.detectChanges();
    if (this.filesPreview) {
      this.filesPreview.interval?.unsubscribe();
    }

    // nos suscribimos a un observable, para escuchar cuando se edite una experiencia
    this.awardService.editedItem$.asObservable().subscribe((award) => {
      console.log(award);
      
      // si es la misma experiencia de este componente, la reemplazamos
      if (this.award._id == award._id) {
        this.award = award;
      }
    });
    let modal = await this.modalCtrl.create({
      component: CreateAwardComponent,
      componentProps: { award: this.award },
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then(() => {
      if (this.filesPreview) {
        this.filesPreview.rotateFiles();
      }
    });
    return await modal.present();
  }
}
