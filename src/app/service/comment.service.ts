import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Howl } from "howler";
import { IComment } from "../models/iPost";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private http: HttpClient) {}

  audio = new Howl({
    src: ["assets/sounds/comment.mp3"],
  });

  /**
   * Reproduce un audio
   */
  public commentAudio() {
    this.audio.load();
    this.audio.play();
  }

  /**
   * Retorna la cantiddad de comentarios en una publicacion
   * @param post _id del post
   * @returns
   */
  getCountsOfComments(post) {
    return this.http.get<number>(
      `${environment.URL_API}/post/countcomments/${post}`
    );
  }

  /**
   * Obtiene comentarios de una publicacion, dependiendo de la paginacion
   * @param post _id del post
   * @param skip cantidad de datos a saltar (paginacion)
   * @returns
   */

  getCommentsByPost(post, skip) {
    return this.http.get<IComment[]>(
      `${environment.URL_API}/post/comments/${post}/${skip}`
    );
  }

  /**
   * Retorna si el usuario comento una publicacion
   */

  userCommentThisPost(user, post) {
    return this.http
      .get(`${environment.URL_API}/post/usercomment/${post}/${user}`)
      .toPromise()
      .then((comment) => {
        if (comment) {
          return true;
        } else {
          throw false;
        }
      })
      .catch(() => {
        throw false;
      });
  }
}
