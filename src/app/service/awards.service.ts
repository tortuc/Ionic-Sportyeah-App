import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { IFile } from "../models/iPost";
import { take } from "rxjs/operators";
import { FilesService } from "./files.service";
import { Howl } from "howler";
import { Subject } from "rxjs";

export interface Awards {
  _id: string;
  userId: string;
  position: string;
  federationTeam: string;
  place: string;
  eventDate: Date;
  title: string;
  description: string;
  files: IFile[];
  date: Date;
  deleted: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AwardService {
  constructor(
    private http: HttpClient,
    private readonly filesService: FilesService
  ) {}
  private route: string = "award";

  getByUser(userId: string) {
    return this.http
      .get<Awards[]>(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1));
  }

  async create(item: Awards, videos: any[]) {
    item.files = await this.filesService.uploadsVideos(videos, item.files);
    return this.http
      .post(`${environment.URL_API}/${this.route}/create`, item, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe((item: Awards) => {
        this.itemCreated(item);
      });
  }

  delete(id: string) {
    return this.http
      .delete<Awards>(`${environment.URL_API}/${this.route}/delete/${id}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1));
  }

  audio = new Howl({
    src: ["assets/sounds/comment.mp3"],
  });

  public commentAudio() {
    this.audio.load();
    this.audio.play();
  }

  async edit(id, item: Awards, videos: any[]) {
    item.files = await this.filesService.uploadsVideos(videos, item.files);

    return this.http
      .put(`${environment.URL_API}/${this.route}/edit/${id}`, item, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe((item: Awards) => {
        this.commentAudio();
        this.editedItem$.next(item);
      });
  }

  // observable para cuando se edite el item
  public editedItem$ = new Subject<Awards>();

  // observable para cuando hay un nuevo item
  public newItem$ = new Subject<Awards>();

  // manda un evento para todos los observables suscritos
  itemCreated(Item) {
    this.newItem$.next(Item);
    this.commentAudio();
  }
}
