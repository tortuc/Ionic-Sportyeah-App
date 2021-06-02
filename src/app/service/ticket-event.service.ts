import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { getToken } from "../helpers/token";

@Injectable({
  providedIn: 'root'
})
export class TicketEventService {

  constructor(
    private http:HttpClient,
    private translate: TranslateService,
    public alertController: AlertController,
  ) { }

  create(body){
    return this.http.post(`${environment.URL_API}/ticketevent/create`,body)
  }

  find(){
    return this.http.get(`${environment.URL_API}/ticketevent`)
  }

  findOne(id){
    return this.http.get(`${environment.URL_API}/ticketevent/one/${id}`)
  }

  findUserTicketEvent(user){
    return this.http.get(`${environment.URL_API}/ticketevent/my/${user}`)
  }

  findByUserInEvent(event,user){
    return this.http.get(`${environment.URL_API}/ticketevent/ticket/${event}/${user}`)
  }

  updateTicketEvent(ticketevent){
    return this.http.put(`${environment.URL_API}/ticketevent/${ticketevent._id}`,ticketevent)
  }

  async delete(id:string){
    return new Promise(async(resolve,reject)=>{
  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("event.deleteModal.confirm_ticket"),
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
              `${environment.URL_API}/ticketevent/delete/${id}`,
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


 
  async devolution(id:string,devolution){
    console.log(id,devolution)
    return new Promise(async(resolve,reject)=>{
  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("event.devolutionModal.confirm_ticket"),
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
              `${environment.URL_API}/ticketevent/devolution/${id}`,{devolution:devolution, headers: new HttpHeaders({ "access-token": getToken() })}
            ).subscribe(()=>{ resolve(true) })
          },
        },
      ],
    });

    await alert.present();
  })
  }



  async devolutionFalse(id:string,devolution){
   
     return  this.http.put(`${environment.URL_API}/ticketevent/devolution/${id}`,{devolution:devolution})
   
  }
}

