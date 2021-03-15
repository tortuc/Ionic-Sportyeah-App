import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import { UserService } from './user.service';

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
    private userService:UserService

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
  
  create(body){
  return this.http.post(`${environment.URL_API}/user/create`,body)
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


}
