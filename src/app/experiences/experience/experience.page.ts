import { IExperience } from "../../models/IExperience";
import { Subject } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { ExperienceService } from "src/app/service/experience.service";
import { UserService } from "src/app/service/user.service";
import { ModalController } from "@ionic/angular";
import { CreateExperienceComponent } from "src/app/experiences/create-experience/create-experience.component";
import { User } from "src/app/models/IUser";

@Component({
  selector: "experience",
  templateUrl: "./experience.page.html",
  styleUrls: ["./experience.page.scss"],
})
export class ExperiencePage implements OnInit {

  @Input() public user: User;
  experiences: IExperience[] = [];

  constructor(
    public experienceService: ExperienceService,
    public userService: UserService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    /**
     * Si las experiencias a cargar son del mismo usuario (perfil privado) nos suscribimos a un observable que avisara si creo una nueva experiencia
     */
    if (this.user._id == this.userService.User?._id) {
      this.experienceService.newExperience$
        .asObservable()
        .subscribe((experience) => {
          this.experiences.unshift(experience);
        });
    }
    this.getExperiences();
  }
  getExperiences() {
    this.experienceService
      .getExperiences(this.user._id)
      .subscribe((res: IExperience[]) => {
        this.experiences = res;
      });
  }

  async newExperience() {
    let modal = await this.modalCtrl.create({
      component: CreateExperienceComponent,
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
