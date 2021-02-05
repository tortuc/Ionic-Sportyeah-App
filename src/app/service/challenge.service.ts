import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./user.service";
export interface IAward {
  media: string;
  place: number;
  title: string;
  description: string;
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}
export interface IUserc {
  appName: string;
  referenceId: string;
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}
export interface IReference {
  userId: IUserc;
  media: string;
  reactions: [];
  comments: [];
  display: number;
  _id?:string;
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}
export interface IChallenge {
  challenging: IReference | string;
  challenged: IReference | string;
  awards: IAward[];
  title: string;
  description: string;
  challenges: IChallenge[];
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}
@Injectable({
  providedIn: "root",
})
export class ChallengeService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService
  ) {}
  private route: string = `${environment.URL_CHALLENGE}/v001/challenge`;

  create(challenge: IChallenge) {
    console.log(`${this.route}/create`);
    return this.http.post(`${this.route}/create`, challenge);
  }

  getAll(){
    return this.http.get(`${this.route}/all`);
  }
}
