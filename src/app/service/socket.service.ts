import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket:Socket;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { 
    if(isPlatformBrowser(this.platformId)) {
      
      this.socket = io(environment.URL_SOCKET);   
    }
  
  }
 

}
