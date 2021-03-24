import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./user.service";

interface Awards {
  _id: string;
  userId: string;
  position: string;
  federationTeam: string;
  place: string;
  eventDate: Date;
  title: string;
  description: string;
  multimediaContent: string[];
  date: Date;
  deleted: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AwardService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService
  ) {}
  private route: string = "award";
  public noAwards: boolean = true;
  public awards: Awards[] = [];
  public awardSelected: Awards = null;

  getByUser(userId: string) {
    this.http
      .get(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe((res: any) => {
        this.awards = res;
        this.noAwards = true;
        this.awards.map((e, i) =>
          e.deleted !== false ? null : (this.noAwards = false)
        );
      });
  }

  create(award: Awards) {
    return this.http.post(
      `${environment.URL_API}/${this.route}/create`,
      award,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("experience.deleteModal.alert"),
      message: this.translate.instant("awards.confirm"),
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
              .subscribe(() => this.getByUser(this.userService.User._id));
          },
        },
      ],
    });

    await alert.present();
  }

  edit(award: Awards) {
    const id = award._id;
    console.log(id);
    console.log(award);
    delete award._id;
    return this.http
      .put(`${environment.URL_API}/${this.route}/edit/${id}`, award, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe(
        () => this.getByUser(this.userService.User._id),
        (err) => console.log(err)
      );
  }

  changeSelected(award: Awards) {
    this.awardSelected = award;
  }
}
