import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewsProfileService {

  constructor(
    public http:HttpClient
  ) { }


/**
   * Crea las vista realizadas a un perfil
   * @param id `_id` del view profile
   * @param user `_id` del usuario
   */
 createProfileView(view){
  return this.http.post(`${environment.URL_API}/viewsProfile/create`,view)
}


 /**
   * Actualiza las vista realizadas a un perfil
   * @param id `_id` del view profile
   * @param user `_id` del usuario
   */
  updateProfileView(visitor:string,visited:string,from:string,link:string){
    return this.http.post(`${environment.URL_API}/viewsProfile/update`,{visited,visitor,from,link})
  }


  /**
   * Trae las vistas donde el id coincida con el id del visitado
   * @param user `_id` del usuario
   */
  getProfileView(id){
    return this.http.get(`${environment.URL_API}/viewsProfile/${id}`)
  }

/**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
 getVisitsByWeek(user,date,from){       
  let format = moment(new Date(date)).format("YYYY-MM-DD");
  return this.http.get(`${environment.URL_API}/viewsProfile/week/${user}/${format}/${from}`)
}

}
