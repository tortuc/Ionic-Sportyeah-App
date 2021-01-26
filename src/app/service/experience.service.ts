import { IExperience } from "./../models/IExperience";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./user.service";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService
  ) {}
  private route: string = "experience";
  public experienceS: IExperience = null;
  public experiences$ = new EventEmitter<IExperience[]>();

  getExperiences(userId: string) {
    this.http
      .get(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe((res: IExperience[]) => {
        this.experiences$.next(res);
      });
  }

  create(experience: IExperience) {
    return this.http.post(
      `${environment.URL_API}/${this.route}/create`,
      experience,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("experience.deleteModal.alert"),
      message: this.translate.instant("experience.deleteModal.confirm"),
      buttons: [
        {
          text: this.translate.instant("experience.deleteModal.cancel"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: this.translate.instant("experience.deleteModal.accept"),
          handler: () => {
            this.http
              .delete(`${environment.URL_API}/${this.route}/delete/${id}`, {
                headers: new HttpHeaders({ "access-token": getToken() }),
              })
              .subscribe(() => this.getExperiences(this.userService.User._id));
          },
        },
      ],
    });

    await alert.present();
  }

  edit(experience: IExperience) {
    let id = experience._id;
    delete experience._id;
    return this.http.put(
      `${environment.URL_API}/${this.route}/edit/${id}`,
      experience,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  changeSelected(e: IExperience) {
    this.experienceS = e;
  }
}
