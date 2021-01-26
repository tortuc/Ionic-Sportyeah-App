import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import {  IChatList } from '../models/IChat';
import {Howl} from 'howler';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

constructor(
  private http:HttpClient,
  private socketService:SocketService
) {
  try {
    this.socketService.socket.on('msg',(data)=>{
    
      this.getMyChats()
      this.playAudio()
    })
  } catch (err){

  }

 }
 audio = new Howl({
  src:['../../assets/sounds/sound1.mp3']
})

playAudio(){
  this.audio.load()
  this.audio.play()
}


public allUnread = 0

public chats:IChatList[] = []

create(user){
  return this.http.post(
    `${environment.URL_API}/chat/create`,
    {user},
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

clearChat(){
  this.chats = []
}

getMyChats(){
  this.http.get(
    `${environment.URL_API}/chat/user`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
  .toPromise()
  .then((chats:IChatList[])=>{      
    this.chats = chats
    this.allUnread = 0

 this.chats.forEach((chat)=>{
  
    
    this.allUnread += chat.unreads
    })
   
    
  })
  .catch((err)=>{
 
    
    // handle err
  })
}


reads(idChat){
  this.chats.map((chat)=>{
    if(chat.chat._id == idChat){
      this.allUnread -= chat.unreads
      return chat.unreads = 0
    }else{
      return chat
    }
  })
}

public logout(){
  this.chats = []
  this.allUnread = 0
}

}
