import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { User } from "../models/IUser";

export interface IGalleryFile {
  user?: User;
  url: string;
  format: string;
  deleted?: boolean;
  date?: Date;
  _id?: string;
}

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  private readonly route = `${environment.URL_API}/gallery`;

  constructor(private readonly http: HttpClient) {}

  public newFile$ = new Subject<IGalleryFile>();

  /**
   * Guarda un nuevo archivo en la galeria
   * @param file
   */
  create(file: IGalleryFile) {
    this.http
      .post<IGalleryFile>(
        `${this.route}/create`,
        { file },
        { headers: new HttpHeaders({ "access-token": getToken() }) }
      )
      .pipe(take(1))
      .subscribe((newFile) => {
        this.newFile$.next(newFile);
      });
  }
  /**
   *Elimina un archivo en la galeria
   * @param file
   */
  delete(id: string) {
    return this.http
      .delete<IGalleryFile>(
        `${this.route}/delete/${id}`,

        { headers: new HttpHeaders({ "access-token": getToken() }) }
      )
      .pipe(take(1));
  }

  /**
   * Obtiene la galeria de un usuario por su id
   * @param id Id del usuario
   */

  getById(id) {
    return this.http
      .get<IGalleryFile[]>(`${this.route}/byuser/${id}`)
      .pipe(take(1));
  }
}
