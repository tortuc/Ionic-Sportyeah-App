import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import {Howl, Howler} from 'howler';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

constructor(
  private http:HttpClient,
  private socketService:SocketService
) { 
  this.getNotificationsUnreads()
  try {
    socketService.socket.on('notification',()=>{      
      this.getNotificationsUnreads()
      this.sound()
    })
  } catch(err){}
    
}

audio = new Howl({
  src:['../../assets/sounds/comment.mp3']
})


public  sound(){
  this.audio.load()
 this.audio.play()
 this.audio
}

public unreads:number = 0

getNotifications(skip){
  return this.http.get(
    `${environment.URL_API}/notification/getall/${skip}`, 
    {
    headers: new HttpHeaders({"access-token":getToken()})
    }
    )
}

getNotificationsUnreads(){
  this.http.get(
    `${environment.URL_API}/notification/unreads`, 
    {
    headers: new HttpHeaders({"access-token":getToken()})
    }
    ).toPromise()
    .then((unreads:number)=>{
      this.unreads = unreads
      
    })
    .catch((err)=>{
      // handle
    })
}


read(id){
  return this.http.put(
    `${environment.URL_API}/notification/read/${id}`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
      }
  )
}

readAll(){
  return this.http.put(
    `${environment.URL_API}/notification/readall`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
      }
  )
}
}
