import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { getToken } from "../helpers/token";
import { UserService } from "./user.service";
import {Howl, Howler} from 'howler';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http:HttpClient,
    public alertController: AlertController,
    private translate: TranslateService,
    private userService: UserService,
  ) { }

  create(body){
    return this.http.post(`${environment.URL_API}/question/create`,body)
  }

  findById(id){
    return this.http.get(`${environment.URL_API}/question/${id}`)
  }
/* 
  findByPost(post){
    return this.http.get(`${environment.URL_API}/question/post/${post}`)
  } 
  findByNews(news){
    return this.http.get(`${environment.URL_API}/question/news/${news}`)
  }
 */
  updateQuestion(data){
    console.log(data)
    return this.http.put(`${environment.URL_API}/question/update/${data._id}`,data)
  }

  async delete(id:string){
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),//Cambiar en el es.js
      message: this.translate.instant("news.deleteModal.confirm"),//Cambiar en el es.js
      buttons: [
        {
          text: this.translate.instant("news.deleteModal.cancel"),//Cambiar en el es.js
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: this.translate.instant("news.deleteModal.accept"),//Cambiar en el es.js
          handler: () => {
            this.http.delete(
              `${environment.URL_API}/question/delete/${id}`,
              {
                headers: new HttpHeaders({ "access-token": getToken() }),
              }
            ).subscribe(()=>{ true })
          },
        },
      ],
    });

    await alert.present();
  }

  voteAnswer(id,user){
    return this.http.get(`${environment.URL_API}/question/answer/${id}/${user}`)
  }

  userVotedAnswer(id,user){
    return this.http.get(`${environment.URL_API}/question/answer/voted/${id}/${user}`)
  }

}
