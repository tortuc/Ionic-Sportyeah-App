import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ViewsSponsorService {

  constructor(
    public http:HttpClient
  ) { }


/**
   * Crea las vista realizadas a un Sponsor
   * @param id `_id` del view profile
   * @param user `_id` del usuario
   */
 createSponsorView(view){
  return this.http.post(`${environment.URL_API}/viewsSponsor/create`,view)
}


 /**
   * Actualiza las vista realizadas a un Sponsor
   * @param id `_id` del view Sponsor
   * @param user `_id` del usuario
   */
  // updateSponsorView(visitor:string,visited:string,from:string,link:string){
  //   return this.http.post(`${environment.URL_API}/viewsSponsor/update`,{visited,visitor,from,link})
  // }


  /**
   * Trae las vistas de los sponsor, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
  getSponsorView(id){
    return this.http.get(`${environment.URL_API}/viewsSponsor/${id}`)
  }


  /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
   getSponsorViewByTime(user,dateStart,dateEnd){
    return this.http.get(`${environment.URL_API}/viewsSponsor/byTime/${user}/${dateStart}/${dateEnd}`)
  }

    /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
     getSponsorViewByDate(user,dateStart,dateEnd,name){       
      return this.http.get(`${environment.URL_API}/viewsSponsor/day/${user}/${dateStart}/${dateEnd}/${name}`)
    }

     /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
      getVisitsByWeek(user,date,from,name){       
        let format = moment(new Date(date)).format("YYYY-MM-DD");
        return this.http.get(`${environment.URL_API}/viewsSponsor/week/${user}/${format}/${from}/${name}`)
      }

          /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
      getVisitsByMonth(user,date,from,name){       
        let format = moment(new Date(date)).format("YYYY-MM-DD");
        return this.http.get(`${environment.URL_API}/viewsSponsor/month/${user}/${format}/${from}/${name}`)
      }


              /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
    getVisitsByYear(user,date,from,name){       
      let format = moment(new Date(date)).format("YYYY-MM-DD");
      return this.http.get(`${environment.URL_API}/viewsSponsor/year/${user}/${format}/${from}/${name}`)
    }


    
              /**
   * Trae las vistas de los sponsor por fecha, donde el id coincida con el id del visitado 
   * @param user `_id` del usuario
   */
      getVisitsByHour(user,date,from,name){       
        let format = moment(new Date(date)).format("YYYY-MM-DD");
        return this.http.get(`${environment.URL_API}/viewsSponsor/hour/${user}/${format}/${from}/${name}`)
      }
    

     /**
   * Trae las vistas de los sponsor por fecha,para los pdf
   * @param user `_id` del usuario
   */
    getVisitsByYearPdf(user,date,name){       
      let format = moment(new Date(date)).format("YYYY-MM-DD");
      return this.http.get(`${environment.URL_API}/viewsSponsor/year/pdf/${user}/${format}/${name}`)
    }
}
