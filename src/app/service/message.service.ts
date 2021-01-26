import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MsgAudioComponent } from '../components/msg-audio/msg-audio.component';
import { Observable ,Subject} from 'rxjs';
import { UserService } from './user.service';
import { getToken } from '../helpers/token';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(
  private http:HttpClient,
  private userService:UserService
) { }

newMessage(message){
  return this.http.post(
    `${environment.URL_API}/message/save`,
    message,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

messagesByChat(chat){
  return this.http.get(
    `${environment.URL_API}/message/chat/${chat}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

deleteMessage(id){
  return this.http.delete(
    `${environment.URL_API}/message/${id}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

readMessages(messages,chat){
  return this.http.put(
    `${environment.URL_API}/message/read`,
      {messages,chat},
      {
        headers: new HttpHeaders({"access-token":getToken()})
      }
  )
}

private idSound$ = new Subject<string>();
idSound = null

/**
 * Avisa a los otros componentes de msg-audio, que un nuevo audio se esta reproduciendo
 */
playSound(id){
  this.idSound = id
  this.idSound$.next(this.idSound)
}


/**
 * Un observable para saber cuando empieza a reproducirse un audio
 */

soundPlaying(){
  return this.idSound$.asObservable();
}



}
