import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';
import { INewPost, IPost, IPostFile } from '../models/iPost';
import { UserService } from './user.service';
import {Howl, Howler} from 'howler';
import { JdvimageService } from './jdvimage.service';
import { Subject } from 'rxjs';
import { Followings } from '../models/IUser';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

export interface idFriends {
  friends_id: Followings[];
  skip: number;
  days: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

constructor(
  private http:HttpClient,
  private imageService:JdvimageService,
  private translate:TranslateService,
  private alertCtrl:AlertController,
) { }
audio = new Howl({
  src:['assets/sounds/comment.mp3']
})


public  commentAudio(){
  this.audio.load()
 this.audio.play()
}



create(body:INewPost){
  return this.http.post(`${environment.URL_API}/post/create`,body)
}

myPost(skip){
  return this.http.get(
    `${environment.URL_API}/post/own/${skip}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

/**
 * Devuelve todas las publicaciones de un usuario
 * @param id `_id` del usuario
 * @param skip 
 * Esta variable sirve para buscar una cantidad especifica de post
 * Esto significa que si empieza en 0 busca las primeras 10 publicaciones
 * En un rango de 0-10
 * luego lo aumentamos 10 es decir busca el rango de las ultimas 10-20... y asi sucecivamente hasta que no trae mas publicaciones 
 */
postByUser(id,skip){
  return this.http.get(
    `${environment.URL_API}/post/user/${id}/${skip}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

friendsPosts(body: idFriends) {
  return this.http.post(`${environment.URL_API}/post/friends`, body, {
    headers: new HttpHeaders({ "access-token": getToken() }),
  });
}

deleteOne(id){
  return this.http.delete(`${environment.URL_API}/post/${id}`)
}

updateOne(id:string,newValues:IPost){
    return this.http.put(`${environment.URL_API}/post/update/${id}`,newValues)
}


likePost(id,reaction){
  return this.http.put(
    `${environment.URL_API}/post/like/${id}` ,{id_reaction:reaction},
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

dislikePost(id){
  return this.http.put(
    `${environment.URL_API}/post/dislike/${id}`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

getPost(id){
  return this.http.get(
    `${environment.URL_API}/post/get/${id}`
  )
}

newComment(body){
  return this.http.post(
    `${environment.URL_API}/post/comment`,
    body,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}


getShareds(id){
  return this.http.get(
    `${environment.URL_API}/post/shareds/${id}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

getPostUser(id){
  return this.http.get(
    `${environment.URL_API}/post/post/${id}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

getAllPost(){
  return this.http.get(`${environment.URL_API}/post/all`,
  {
    headers: new HttpHeaders({"access-token":getToken()})
  })
}



uploadsVideos(videos: any[], files: IPostFile[], i = 0) {
  return new Promise(async (resolve) => {

    let newFiles = await Promise.all(
      // utilziamos un .map que recorre el array y lo modifica
      files.map(
        async (file): Promise<IPostFile> => {
          // buscamos si hay un video, en el array de video donde la url coincida con la url de este archivo
          let video = await videos.find((x) => x.url == file.url);
          // si existe entonces cargamos el video al servidor
          if (video) {
            let form = new FormData();
            form.append("video", video.file);
            // esperamos la url
            file.url = (await this.imageService.uploadVideo(
              form,
              true
            )) as string;
            // modificamos el archivo
            return file;
          } else {
            // no existe video, no modificamos el archivo
            return file;
          }
        }
      )
    );
    // devolvemos la data correctamente

    resolve(newFiles);
  
  });
}



private removeFile$ = new Subject<string>();

fileRemoved(url: string) {
  this.removeFile$.next(url);
}

fileRemovedSuscriber() {
  return this.removeFile$.asObservable();
}

 /**
   * Saber si un usuario reacciono a un post
   * @param id _id del post
   * @param user _id del usuario
   *
   */

  userReactToPost(id, user) {
    return this.http.get(`${environment.URL_API}/post/reacted/${id}/${user}`);
  }

  changeReact(id, type) {
    return this.http.put(
      `${environment.URL_API}/post/changereact/${id}/${type}`,
      null,
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  /**
   * Cantidad de reacciones en una publicacion
   *
   */

   countReactionsByPost(post) {
    return this.http.get<number>(
      `${environment.URL_API}/post/reactions/${post}`
    );
  }


  async uploadVideoPost(post, videos, files) {
    this.showAlert(
      this.translate.instant("upload_video.uploading.header"),
      this.translate.instant("upload_video.uploading.message")
    );
    post.files = await this.uploadsVideos(videos, files);
    this.create(post)
      .toPromise()
      .then((post: IPost) => {
        this.newPost(post._id);
        this.showAlert(
          this.translate.instant("upload_video.create.header"),
          this.translate.instant("upload_video.create.message")
        );
      })
      .catch((err) => {
        this.showAlert(
          this.translate.instant("upload_video.error.header"),
          this.translate.instant("upload_video.error.message")
        );
      });
  }

  async showAlert(header, message) {
    this.alertCtrl.dismiss().catch((e) => {
      // no hay alerta que cerrar
    });

    let alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{ text: this.translate.instant("okey") }],
    });
    alert.present();
  }




   // observable para cuando hay una nueva publicacion
   private newPost$ = new Subject<string>();

   // manda un evento para todos los observables suscritos
   newPost(id: string) {
     this.newPost$.next(id);
     this.commentAudio()
   }
 
   // funcion para suscribirse al observable de la nueva publicacion
 
   newPostObservable() {
     return this.newPost$.asObservable();
   }
 

}
