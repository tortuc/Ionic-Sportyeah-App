import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";

import * as moment from "moment";
import { SocketService } from "./socket.service";

@Injectable({
  providedIn: "root",
})
export class AnalyticService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  /**
   * Obtener los visitantes de mi perfil
   */

  getVisitorsMyProfile() {
    return this.http.get(`${environment.URL_API}/analytics/visitsmyprofile`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Obtener la cantidad de visitas a mi perfil y la cantidad de mis publicaciones
   *
   */

  getAnalitycsMyProfile() {
    return this.http.get(`${environment.URL_API}/analytics/profile`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Obtiene la cantidad de visitas por semana, pasandole una fecha
   * @param date
   */
  getVisitsByDate(date) {
    let format = moment(new Date(date)).format("YYYY-MM-DD");
    return this.http.get(`${environment.URL_API}/analytics/visits/${format}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Obtiene la cantidad de visitas por semana en un evento, pasandole una fecha
   * @param date
   */
  getVisitsEventByDate(date, event) {
    let format = moment(new Date(date)).format("YYYY-MM-DD");
    return this.http.get(
      `${environment.URL_API}/analyticEvent/event/${event}/${format}`,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  storeApp(type, place) {
    this.socketService.socket.emit("click-on-store", { type, place });
  }

  /**
   * Obtener la cantidad de visitas a una tarea en lista de regalos
   */

  getAnalitycsVisitsTodo(todo) {
    return this.http.get(
      `${environment.URL_API}/analytics/todo/visits/${todo}`
    );
  }
  getAnalitycsVisitsList(list) {
    return this.http.get(
      `${environment.URL_API}/analytics/list/visits/${list}`
    );
  }
  /**
   * Obtiene el ultimo registro de quien indico que sera el regalador en un "todo" de la lista de regalos
   * @param todo
   * @returns
   */
  getLastRecordGiver(todo) {
    return this.http.get(
      `${environment.URL_API}/analytics/todo/giver/record/${todo}`
    );
  }


  /**
   * Obtiene la cantidad de seguidores / seguidos de un usuario
   */

  getFollowsAnalytic(user){
    return this.http.get<{followers:number,followings:number}>(`${environment.URL_API}/analytics/follows/${user}`)  
  }
}
