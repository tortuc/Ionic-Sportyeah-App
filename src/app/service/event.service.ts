import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { getToken } from "../helpers/token";
import { FilesService } from './files.service';
import { Subject } from 'rxjs';
import { IEvent } from '../models/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http:HttpClient,
    private translate: TranslateService,
    public alertController: AlertController,
    private filesServices:FilesService,
    private alertCtrl:AlertController,
  ) { }

  public eventEdited$ = new Subject<IEvent>();

  create(body){
    return this.http.post(`${environment.URL_API}/event/create`,body)
  }

  find(){
    return this.http.get(`${environment.URL_API}/event`)
  }

  findOne(id){
    return this.http.get(`${environment.URL_API}/event/one/${id}`)
  }

  findUserEvent(user){
    return this.http.get(`${environment.URL_API}/event/my/${user}`)
  }

  updateEvent(event){
    return this.http.put(`${environment.URL_API}/event/edit/${event._id}`,event)
  }


  async delete(id:string){
    return new Promise(async(resolve,reject)=>{
  
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.translate.instant("news.deleteModal.alert"),
      message: this.translate.instant("event.deleteModal.confirm"),
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
              `${environment.URL_API}/event/delete/${id}`,
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



  async uploadVideoEvent(post, videos, files) {
    this.showAlert(
      this.translate.instant("upload_video.uploading.header"),
      this.translate.instant("upload_video.uploading.message")
    );
    post.files = await this.uploadsVideos(videos, files);
    this.create(post)
      .toPromise()
      .then((post) => {
        // this.newPost(post._id);
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

  uploadsVideos(videos: any[], files:any [], i = 0) {
    return new Promise(async (resolve) => {
  
      let newFiles = await Promise.all(
        // utilziamos un .map que recorre el array y lo modifica
        files.map(
          async (file): Promise<any> => {
            // buscamos si hay un video, en el array de video donde la url coincida con la url de este archivo
            let video = await videos.find((x) => x.url == file.url);
            // si existe entonces cargamos el video al servidor
            if (video) {
              let form = new FormData();
              form.append("video", video.file);
              // esperamos la url
              file.url = (await this.filesServices.uploadVideo(
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

  
}
