import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { getToken } from "../helpers/token";
import { async } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ITicket } from '../models/IEvent';

@Injectable({
  providedIn: 'root'
})
export class TicketEventService {

  constructor(
    private http:HttpClient,
    private translate: TranslateService,
    public alertController: AlertController,
  ) { }

  public ticketChange$ = new Subject<ITicket>();

  create(body){
    return this.http.post(`${environment.URL_API}/ticketevent/create`,body)
  }

  find(){
    return this.http.get(`${environment.URL_API}/ticketevent`)
  }

  /**
     * Encuentra los ticketEvento por evento
     * 
     * 
     * @method post
     */
  findTicketInvitedUsers(id){
    return this.http.get(`${environment.URL_API}/ticketevent/invited/${id}`)
  }

   /**
     * Encuentra un ticketEvento
     * 
     * 
     * @method post
     */
  findOne(id){
    return this.http.get(`${environment.URL_API}/ticketevent/one/${id}`)
  }

/**
 * Encuentra todos los ticketEvento de un usuario
 * 
 * 
 * @method get
 */
  findUserTicketEvent(user){
    return this.http.get(`${environment.URL_API}/ticketevent/my/${user}`)
  }

/**
 * Encuentra los ticketEvento de un usuario en cierto evento
 * 
 * 
 * @method get
 */
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


  async acceptInvitation(id:string){
    return new Promise(async(resolve,reject)=>{
  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("event.invitationModal.accept_invitation"),
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
              `${environment.URL_API}/ticketevent/accept/${id}`,{headers: new HttpHeaders({ "access-token": getToken() })}
            ).subscribe(()=>{ resolve(true) })
          },
        },
      ],
    });

    await alert.present();
  })
  }

  async deniesInvitation(id:string){
    return new Promise(async(resolve,reject)=>{
  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("event.invitationModal.denies_invitation"),
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
              `${environment.URL_API}/ticketevent/denies/${id}`,{headers: new HttpHeaders({ "access-token": getToken() })}
            ).subscribe(()=>{ resolve(true) })
          },
        },
      ],
    });

    await alert.present();
  })
  }

  async sendInvitation(users,event){
    for(let user of users){
      let ticket = {
        user:user._id,
        event:event._id,
        open:event.open,
        register:event.register,
        importPrice:event.importPrice,
        devolution:false,
        invited:true,
      }
    await this.create(ticket).subscribe(response => console.log(''));
    }
  }

}

