import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./user.service";

interface Aptitudes {
  _id: string;
  userId: string;
  score: string;
  title: string;
  date: Date;
  deleted: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AptitudesService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService
  ) {}
  private route: string = "aptitude";
  public noAptitudes: boolean = true;
  public aptitudes: Aptitudes[] = [];
  public aptitudeSelected: Aptitudes = null;

  getByUser(userId: string) {
    this.http
      .get(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe((res: any) => {
        this.aptitudes = res;
        this.noAptitudes = true;
        this.aptitudes.map((e, i) =>
          e.deleted !== false ? null : (this.noAptitudes = false)
        ); 
      });
  }

  create(aptitude: Aptitudes) {
    return this.http.post(
      `${environment.URL_API}/${this.route}/create`,
      aptitude,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  async delete(id:string){
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("experience.deleteModal.alert"),
      message: this.translate.instant("aptitudes.confirm"),
      buttons: [
        {
          text: this.translate.instant("experience.deleteModal.cancel"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
        {
          text: this.translate.instant("experience.deleteModal.accept"),
          handler: () => {
            this.http.delete(
              `${environment.URL_API}/${this.route}/delete/${id}`,
              {
                headers: new HttpHeaders({ "access-token": getToken() }),
              }
            ).subscribe(()=>this.getByUser(this.userService.User._id));
          },
        },
      ],
    });

    await alert.present();
  }

  edit(aptitude: Aptitudes) {
    const id = aptitude._id
    delete aptitude._id
    return this.http.put(
      `${environment.URL_API}/${this.route}/edit/${id}`,
      aptitude,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    ).subscribe(()=>this.getByUser(this.userService.User._id),err=>{});
  }

  changeSelected(aptitude: Aptitudes){
    this.aptitudeSelected = aptitude;
  }
}
