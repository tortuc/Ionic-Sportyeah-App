import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IPost } from "../models/iPost";

@Injectable({
  providedIn: "root",
})
export class ShareService {
  constructor(private http: HttpClient) {}

  /**
   * Retorna la cantidad de veces que se ha compartido una publicacion
   * @param post _id de la publicacion
   */
  getTotalSharedsInPost(post) {
    return this.http.get<number>(
      `${environment.URL_API}/post/totalshareds/${post}`
    );
  }


   /**
   * Retorna la cantidad de veces que se ha compartido una noticia
   * @param news _id de la noticia
   */
    getTotalSharedsInNews(news) {
      return this.http.get<number>(
        `${environment.URL_API}/news/totalshareds/${news}`
      );
    }

  /**
   * Obtiene 10 comparticiones de un post, los traera dependiendo del skip
   * @param post _id del post
   * @param skip cantidad de registros a saltar
   */

  getSharedsByPost(post, skip) {
    return this.http.get<IPost[]>(`${environment.URL_API}/post/shareds/${post}/${skip}`);
  }
}
