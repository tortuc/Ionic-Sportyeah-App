import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ILike } from "../models/iPost";

interface TotalReactionsData {
  _id: number;
  total: number;
}

@Injectable({
  providedIn: "root", 
})
export class ReactionsService {
  constructor(private http: HttpClient) {}

  routePost = `${environment.URL_API}/post`;

  /**
   * Retorna la cantidad de reacciones por publicacion
   * @param id
   * @returns
   */
  reactionsByPost(id) {
    return this.http.get<any[]>(`${this.routePost}/totalReactions/${id}`);
  }
  /**
   * Buscar reacciones de cualquier tipo en un post
   * @param id
   * @returns
   */

  anyReactionPost(post, skip) {
    return this.http.get<ILike[]>(
      `${this.routePost}/anyreactions/${post}/${skip}`
    );
  }
  /**
   * Buscar reacciones de un tipo en especifico en una publicacion
   * @param id
   * @returns
   */

  ReactionsPostByType(post, skip,type) {
    return this.http.get<ILike[]>(
      `${this.routePost}/reactionstype/${post}/${type}/${skip}`
    );
  }
}
