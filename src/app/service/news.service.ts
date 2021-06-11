import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { getToken } from "../helpers/token";
import { UserService } from "./user.service";
import {Howl, Howler} from 'howler';
import { Subject } from "rxjs";
import { async } from '@angular/core/testing';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public idNews;
  public news = []
  constructor(
    private http:HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService,
  ) { }
  audio = new Howl({
    src:['../../assets/sounds/comment.mp3']
  })
  
  
  public  commentAudio(){
    this.audio.load()
   this.audio.play()
  }


  create(body){
    return this.http.post(`${environment.URL_API}/news/create`,body)
  }

  find(){
    return this.http.get(`${environment.URL_API}/news`)
  }

  findStreaming(){
    return this.http.get(`${environment.URL_API}/news/streaming`)
  }

  findById(id){
    return this.http.get(`${environment.URL_API}/news/${id}`)
  }

  findBySport(sport){
    return this.http.get(`${environment.URL_API}/news/sport/${sport}`)
  }

  findUserNews(user){
    return this.http.get(`${environment.URL_API}/news/own/${user}`)
  }

  findUserDeletedNews(user){
    return this.http.get(`${environment.URL_API}/news/deleted/${user}`)
  }

  findUserProgramatedNews(user){
    return this.http.get(`${environment.URL_API}/news/programated/${user}`)
  }

  updateNews(news:any){
    return this.http.put(`${environment.URL_API}/news/update/${news._id}`,news)
  }
  
  deleteNews(id){
    return this.http.delete(`${environment.URL_API}/news/delete/${id}`)
  }

  async delete(id:string){
    return new Promise(async(resolve,reject)=>{

  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("news.deleteModal.confirm"),
      buttons: [
        {
          text: this.translate.instant("news.deleteModal.cancel"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            resolve(false)
          },
        },
        {
          text: this.translate.instant("news.deleteModal.accept"),
          handler: () => {
            this.http.delete(
              `${environment.URL_API}/news/delete/${id}`,
              {
                headers: new HttpHeaders({ "access-token": getToken() }),
              }
            ).subscribe(()=>{ resolve(true) })
          },
        },
      ],
    });

    await alert.present();
  })
  }

  async restore(id:string){
    return new Promise(async(resolve,reject)=>{
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("news.restore_modal"),
      buttons: [
        {
          text: this.translate.instant("news.deleteModal.cancel"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            resolve(false)
          },
        },
        {
          text: this.translate.instant("news.deleteModal.accept"),
          handler: () => {
            this.http.put(
              `${environment.URL_API}/news/restore/${id}`,
              {
                headers: new HttpHeaders({ "access-token": getToken() }),
              }
            ).subscribe(() =>{ resolve(true) })
          },
        },
      ],
    });
    
    await alert.present();
  })
  }

  likeNews(id,reaction){
    return this.http.put(
      `${environment.URL_API}/news/like/${id}` ,{id_reaction:reaction},
      {
        headers: new HttpHeaders({"access-token":getToken()})
      }
    )
  }


  dislikeNews(id){
    return this.http.put(
      `${environment.URL_API}/news/dislike/${id}`,
      null,
      {
        headers: new HttpHeaders({"access-token":getToken()})
      }
    )
  }


  newComment(body){
    return this.http.post(
      `${environment.URL_API}/news/comment`,
      body,
      {
        headers: new HttpHeaders({"access-token":getToken()})
      }
    )
  }
  
  getShareds(id){
    return this.http.get(
      `${environment.URL_API}/news/shareds/${id}`,
      {
        headers: new HttpHeaders({"access-token":getToken()})
      }
    )
  }



  private idSound$ = new Subject<string>();
  idSound = null;

  /**
   * Avisa a los otros componentes de msg-audio, que un nuevo audio se esta reproduciendo
   */
  playSound(url) {
    this.idSound = url;
    this.idSound$.next(this.idSound);
  }

  /**
   * Un observable para saber cuando empieza a reproducirse un audio
   */

  soundPlaying() {
    return this.idSound$.asObservable();
  }


  changeReact(id, type) {
    return this.http.put(
      `${environment.URL_API}/news/changereact/${id}/${type}`,
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

   countReactionsByNews(news) {
    return this.http.get<number>(
      `${environment.URL_API}/news/reactions/${news}`
    );
  }

   /**
   * Saber si un usuario reacciono a un news
   * @param id _id del news
   * @param user _id del usuario
   *
   */

    userReactToNews(id, user) {
      return this.http.get(`${environment.URL_API}/news/reacted/${id}/${user}`);
    }


    rescheduleNews(id,date){
      return this.http.put(`${environment.URL_API}/news/rescheduleNews/${id}`,date)
    }

}
