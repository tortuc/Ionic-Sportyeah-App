import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Howl } from "howler";
import { IComment } from "../models/iPost";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import { LoadingService } from "./loading.service";
import { PostService } from "./post.service";
import { getToken } from "../helpers/token";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private readonly loading: LoadingService,
    private readonly postService:PostService
  ) {}

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
   * Retorna la cantiddad de comentarios (respuestas) en un comentario
   * @param comment _id del comment
   * @returns
   */
  getCountsOfCommentsInComment(comment) {
    return this.http.get<number>(
      `${environment.URL_API}/comment/countcomments/${comment}`
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
   * Obtiene respuesta de un comentario, dependiendo de la paginacion
   * @param comment _id del comment
   * @param skip cantidad de datos a saltar (paginacion)
   * @returns
   */

  getRespondsByComments(comment, skip) {
    return this.http.get<IComment[]>(
      `${environment.URL_API}/comment/comments/${comment}/${skip}`
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

  deleteOne(id) {
    return this.http.delete(`${environment.URL_API}/post/comment/${id}`);
  }

  public commentEditd$ = new Subject<IComment>();
  async updateOne(id: string, newValues: IComment,files,videos) {

    newValues.files = await this.postService.uploadsVideos(videos, files);

    this.loading.present();
    this.http
      .put<IComment>(
        `${environment.URL_API}/post/comment/update/${id}`,
        newValues
      )
      .pipe(take(1))
      .subscribe(
        (comment) => {
          this.loading.dismiss();
          this.commentEditd$.next(comment);
        },
        (error) => {
          this.loading.dismiss();
        }
      );
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
   * Retorna si el usuario respondio un comentario
   */

  userRespondThisComment(user, comment) {
    return this.http
      .get(`${environment.URL_API}/comment/usercomment/${comment}/${user}`)
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


  
likeComment(id,reaction){
  return this.http.put(
    `${environment.URL_API}/comment/like/${id}` ,{id_reaction:reaction},
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

dislikeComment(id){
  return this.http.put(
    `${environment.URL_API}/comment/dislike/${id}`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

 /**
   * Cantidad de reacciones en un comentario
   *
   */

  countReactionsByComment(comment) {
    return this.http.get<number>(
      `${environment.URL_API}/comment/reactions/${comment}`
    );
  }

   /**
   * Saber si un usuario reacciono a un comentario
   * @param id _id del comentario
   * @param user _id del usuario
   *
   */

    userReactToComment(id, user) {
      return this.http.get(`${environment.URL_API}/comment/reacted/${id}/${user}`);
    }

    changeReact(id, type) {
      return this.http.put(
        `${environment.URL_API}/comment/changereact/${id}/${type}`,
        null,
        {
          headers: new HttpHeaders({ "access-token": getToken() }),
        }
      );
    }


}
