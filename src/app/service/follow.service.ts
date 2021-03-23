import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

constructor(
  private http:HttpClient,
  private userService:UserService

) { }

getFollowersById(id){
  return this.http.get(
   `${environment.URL_API}/friend/followers/${id}`,
   {
     headers: new HttpHeaders({"access-token":getToken()})
   }
 )
}

getFollowingsById(id){
 return this.http.get(
  `${environment.URL_API}/friend/followings/${id}`,
  {
    headers: new HttpHeaders({"access-token":getToken()})
  }
)
}

}
