import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JdvimageService {

constructor(
  private http:HttpClient
) { }

/**
 * Sube una imagen al servidor
 * se le debe pasar un formData con un `image` tipo archibo
 * @param {FormData} body
 * @returns url de la imagen 
 */
uploadImage(body:FormData){
    return this.http.post(`${environment.URL_IMAGE}/image/upload`,body)
}

uploadFile(body:FormData){
  return this.http.post(`${environment.URL_IMAGE}/document/upload`,body)
}

getAvatars(){
  return this.http.get(`${environment.URL_IMAGE}/avatar/all`)
}

uploadAudio(body:FormData){
  return this.http.post(`${environment.URL_IMAGE}/audio/upload`,body)
}

uploadVideo(body:FormData){
  return this.http.post(`${environment.URL_IMAGE}/video/upload`,body,{reportProgress:true})
}





}
