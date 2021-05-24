import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./user.service";
import { Howl } from "howler";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";

export interface Aptitude {
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

  audio = new Howl({
    src: ["assets/sounds/comment.mp3"],
  });

  public commentAudio() {
    this.audio.load();
    this.audio.play();
  }

  getByUser(userId: string) {
    return this.http
      .get<Aptitude[]>(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1));
  }

  async create(item: Aptitude) {
    return this.http
      .post(`${environment.URL_API}/${this.route}/create`, item, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe((item: Aptitude) => {
        this.itemCreated(item);
      });
  }



  
  delete(id: string) {
    return this.http
      .delete<Aptitude>(`${environment.URL_API}/${this.route}/delete/${id}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1));
  }

 
  async edit(id, item: Aptitude) {

    return this.http
      .put(`${environment.URL_API}/${this.route}/edit/${id}`, item, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe((item: Aptitude) => {
        this.commentAudio();
        this.editedItem$.next(item);
      });
  }



  // observable para cuando se edite el item
  public editedItem$ = new Subject<Aptitude>();

  // observable para cuando hay un nuevo item
  public newItem$ = new Subject<Aptitude>();

  // manda un evento para todos los observables suscritos
  itemCreated(Item) {
    this.newItem$.next(Item);
    this.commentAudio();
  }
}
