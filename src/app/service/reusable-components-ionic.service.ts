import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenImgComponent } from "src/app/components/open-img/open-img.component";
import { Injectable } from '@angular/core';
import { 
  ToastController, 
  AlertController, 
  ModalController 
} from '@ionic/angular';

/*
 * Servicio para facilitar el uso de componentes de IONIC
 * Te animo a crear el tuyo
 */

@Injectable({
  providedIn: 'root'
})
export class ReusableComponentsIonic {
  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public mc: ModalController
  ){}

  /*
   * Funcion para generar un toast
   */
  async toast(
    message:string,
  ){
    const toast = await this.toastCtrl.create({
      message,
      cssClass:"centerToast",
      duration:2000
    })
    await toast.present()
  } 

  /*
   * Funcion para crear una modal de desicion
   */
  desicionAlert(header:string,message:string): Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
      let alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text:'Cancelar',
            handler:()=>{
              resolve(false)
            }
          },

          {
            text: 'De Acuerdo',
            role: 'acept',
            handler:()=>{
              resolve(true)
            }
          },
        ],
      });

      await alert.present()
    })
  }

  /*
   * Funcion para abrir una imagen
   * No es de Ionic pero puede ser util
   */
  async openImg(img:string,idUser:string){
    const modal = await this.mc.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser,
        delete: false,
      },
    });
    await modal.present();
  }

}
