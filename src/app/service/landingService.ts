import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { UserService } from "./user.service";
import { ToastController } from "@ionic/angular";

export interface ILanding {
  _id: string;
  username: string;
  banner: string;
  logo: string;
  title: string;
  description: string;
  button: string;
  divider: string;
  dividerImg: string;
  ptitle: string;
  psubtitle: string;
  stitle: string;
  ssubtitle: string;
  s1title: string;
  s1description: string;
  s1iconName: string;
  s2title: string;
  s2description: string;
  s2iconName: string;
  s3title: string;
  s3description: string;
  s3iconName: string;
  products: any[];
  twitter: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  copyright: string;
  active: boolean;
}

@Injectable({
  providedIn: "root",
})
export class LandingService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService,
    public toastController: ToastController
  ) {}
  private route: string = "landing";
  public editing: string = `hola`;
  public productArray: any = { index: null, property: null };
  private photoTest: string = `https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg`;
  public defaultLanding: ILanding = {
    _id: null,
    username: null,
    logo: null,
    banner: `https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80`,
    title: `THIS CAN BE YOUR LANDING`,
    description: `This can be your LANDING`,
    button: `Learn More`,
    divider: `This is a divider thanks`,
    dividerImg: `https://i.ibb.co/Gp1Nr3N/map-image.png`,
    ptitle: `Products`,
    psubtitle: `Products Subtitle`,
    products: [
      {
        photo: this.photoTest,
        title: `productA`,
        subtitle: `productB`,
        url: `https://www.google.com`,
      },
      {
        photo: this.photoTest,
        title: `productA`,
        subtitle: `productB`,
        url: `https://www.google.com`,
      },
      {
        photo: this.photoTest,
        title: `productA`,
        subtitle: `productB`,
        url: `https://www.google.com`,
      },
    ],
    stitle: `Services`,
    ssubtitle: `Services Subtitle`,
    s1title: `E-commerce`,
    s1description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into `,
    s1iconName: `cart`,
    s2title: `Responsive Design`,
    s2description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into `,
    s2iconName: `phone-portrait`,
    s3title: `Security`,
    s3description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into`,
    s3iconName: `lock-closed`,
    twitter: `https://twitter.com/`,
    facebook: `https://www.facebook.com/`,
    instagram: `https://www.instagram.com/`,
    linkedin: `https://www.linkedin.com/`,
    tiktok: `https://www.tiktok.com/es/`,
    copyright: null,
    active: false,
  };
  public ls: ILanding = Object.assign({}, this.defaultLanding);

  update(newLanding: ILanding) {
    this.ls = newLanding;
  }

  getIcons() {
    return this.http.get(
      `${environment.URL_API}/${this.route}/ionicIcons`
    );
  }

  getByUser(username: string) {
    return this.http.get(`${environment.URL_API}/${this.route}/${username}`);
  }

  create(landing: ILanding) {
    return this.http.post(
      `${environment.URL_API}/${this.route}/create`,
      landing,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  async delete(landing: ILanding) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("experience.deleteModal.alert"),
      message: this.translate.instant("awards.confirm"),
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
            landing.active = !landing.active;
            this.edit(landing);
          },
        },
      ],
    });

    await alert.present();
  }

  edit(landing: ILanding) {
    const id = landing._id;
    delete landing._id;
    return this.http
      .put(`${environment.URL_API}/${this.route}/edit/${id}`, landing, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe((r: any) => {
        this.ls = r;
        this.ls._id = id;
        this.toastController
          .create({
            message: this.translate.instant("LandingSave"),
            duration: 2000,
          })
          .then((t) => t.present());
      });
  }

  changeSelected(landing: ILanding) {
    this.ls = landing;
  }
}
