import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

interface Geo {
  ip:string
  country:string
  city:string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
  
   }
  
  
   geo:Geo = {
    ip:'',
    country:'',
    city:''
   }
  
  getIP() {
    const geo = new Subject<Geo>()
    this.http.get('https://extreme-ip-lookup.com/json/').subscribe((resp:any)=>{
      this.geo.ip = resp.query
      this.geo.country = resp.country
      this.geo.city = resp.city
      geo.next(this.geo);
    })
    return geo.asObservable();
  }
  
 /**
   * Crea a un usuario
   * @param user
   * @returns
   */
  create(user) {
    // verificamos si el usuario se esta registrando, mediante una landing de un evento
    let event = this.cookieService.check("join_event")
      ? this.cookieService.get("join_event")
      : null;
    // borramos la cookie
    this.cookieService.delete("join_event");
    return this.http.post(`${environment.URL_API}/user/create`, {
      user,
      event,
    });
  }

  auth(body){
    body.geo = this.geo
    return this.http.post(`${environment.URL_API}/user/auth`,body)
  }
  
  connections(){
    return this.http.get(`${environment.URL_API}/user/connections`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
    )
  }


  forgot(body){
    return this.http.post(`${environment.URL_API}/user/forgot`,body)
  }

  verifyToken(token){
    return this.http.post(`${environment.URL_API}/user/verifytoken`,{token})
  }

  newPassword(body){
    return this.http.post(`${environment.URL_API}/user/newpassword`,body)   
  }

  resend(body){
    return this.http.post(`${environment.URL_API}/user/resend`,body)
  }

  verification(token){
    return this.http.post(`${environment.URL_API}/user/verification`,{token})
  }

   /**
   * Redirige desde una publicacion, al login para iniciar sesion y volver a la publicacion
   * (solo usar si no hay usuario logueado)
   * @param route ruta al cual se redirige una vez el usuario inicie sesion
   */
    goToLogin(route) {
      this.cookieService.set("login_redirect", route);
      this.router.navigate(["/login"]);
    }


   
}
