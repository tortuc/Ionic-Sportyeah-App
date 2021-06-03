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
   * Retorna la cantiddad de comentarios en una noticia
   * @param news _id del news
   * @returns
   */
     getCountsOfCommentsNews(news) {
      return this.http.get<number>(
        `${environment.URL_API}/news/countcomments/${news}`
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


  deleteOne(id){
    return this.http.delete(`${environment.URL_API}/post/comment/${id}`)
  }
  

  updateOne(id:string,newValues:IComment){
      return this.http.put(`${environment.URL_API}/post/comment/update/${id}`,newValues)
  }
  


  /**
   * Obtiene comentarios de una noticia, dependiendo de la paginacion
   * @param news _id del news
   * @param skip cantidad de datos a saltar (paginacion)
   * @returns
   */

   getCommentsByNews(news, skip) {
    return this.http.get<IComment[]>(
      `${environment.URL_API}/news/comments/${news}/${skip}`
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



    /**
   * Retorna si el usuario comento una noticia
   */

     userCommentThisNews(user, news) {
      return this.http
        .get(`${environment.URL_API}/news/usercomment/${news}/${user}`)
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
