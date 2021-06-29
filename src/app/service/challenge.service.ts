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
  _id?: string;
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}
export interface IUserc {
  appName: string;
  referenceId: string;
  _id?: string;
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
  _id?: string;
  createdAt?: string;
  modifiedAt?: string;
  deleted?: string;
}

export interface IChallenge {
  challenging: any;
  challenged: any;
  views: string[];
  awards: IAward[];
  title: string;
  description: string;
  challenges: IChallenge[];
  public: boolean;
  solidary?:any;
  intentos?: any[];
  _id?: string;
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
  private route: string = `${environment.URL_CHALLENGE}`;

  create(challenge: IChallenge) {
    return this.http.post(`${this.route}/create`, challenge);
  }

  getAll() {
    return this.http.get(`${this.route}/all`);
  }

  getById(id: string) {
    return this.http.get(`${this.route}/${id}`);
  }

  createComment(comment: any) {
    return this.http.post(`${this.route}/comment`, comment);
  }

  createReaction(reaction: any) {
    return this.http.post(`${this.route}/reaction`, reaction);
  }

  updateViews(idC: string, views: string[]) {
    return this.http.post(`${this.route}/updateviews`, { idC, views });
  }

  deleteChallenge(_id: string){
    return this.http.get(`${this.route}/delete/${_id}`);
  }

  getUserChallenge(_id:string){
    return this.http.get(`${this.route}/getUserChallenge/${_id}`)
  }

  getParent(idChallenge:string){
    return this.http.get(`${this.route}/parent/${idChallenge}`)
  }
}
