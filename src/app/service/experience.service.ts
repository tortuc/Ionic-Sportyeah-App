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
import { IFile } from "../models/iPost";
import { FilesService } from "./files.service";
import { Howl } from "howler";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService,
    private readonly filesServices: FilesService
  ) {}
  private route: string = "experience";

  getExperiences(userId: string) {
    return this.http
      .get(`${environment.URL_API}/${this.route}/${userId}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1));
  }

  async create(experience: IExperience, videos: any[]) {
    experience.files = await this.uploadsVideos(videos, experience.files);
    return this.http
      .post(`${environment.URL_API}/${this.route}/create`, experience, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .subscribe((experience: IExperience) => {
        this.experienceCreated(experience);
      });
  }

  delete(id: string) {
    return this.http
      .delete(`${environment.URL_API}/${this.route}/delete/${id}`, {
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

  async edit(id, experience: IExperience, videos: any[]) {
    experience.files = await this.uploadsVideos(videos, experience.files);

    return this.http
      .put(`${environment.URL_API}/${this.route}/edit/${id}`, experience, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe((experience: IExperience) => {
        this.commentAudio();
        this.editedExperience$.next(experience);
      });
  }

  // observable para cuando se edita una experiencia
  public editedExperience$ = new Subject<IExperience>();

  // observable para cuando hay una nueva experiencia
  public newExperience$ = new Subject<IExperience>();

  // manda un evento para todos los observables suscritos
  experienceCreated(experience) {
    this.newExperience$.next(experience);
    this.commentAudio();
  }

  uploadsVideos(
    videos: any[],
    files: IFile[],
    i = 0
  ): Promise<IFile[]> {
    return new Promise(async (resolve) => {
      let newFiles = await Promise.all(
        // utilziamos un .map que recorre el array y lo modifica
        files.map(async (file): Promise<IFile> => {
          // buscamos si hay un video, en el array de video donde la url coincida con la url de este archivo
          let video = await videos.find((x) => x.url == file.url);
          // si existe entonces cargamos el video al servidor
          if (video) {
            let form = new FormData();
            form.append("video", video.file);
            // esperamos la url
            file.url = (await this.filesServices.uploadVideo(
              form,
              true
            )) as string;
            // modificamos el archivo
            return file;
          } else {
            // no existe video, no modificamos el archivo
            return file;
          }
        })
      );
      // devolvemos la data correctamente

      resolve(newFiles);
    });
  }
}
