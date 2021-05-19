import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";
import { getToken } from "../helpers/token";
import { take } from "rxjs/operators";
import { Howl } from "howler";
import { IPostFile } from "../models/iPost";
import { FilesService } from "./files.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(
    private http: HttpClient,
    private filesServices: FilesService
  ) {}
  audio = new Howl({
    src: ["assets/sounds/drop.mp3"],
  });

  /**
   * Reproduce un audio tipo gota
   */
  playDropsound() {
    this.audio.load();
    this.audio.play();
  }

  newMessage(message) {
    this.http
      .post(`${environment.URL_API}/message/save`, message, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .pipe(take(1))
      .subscribe();
  }

  messagesByChat(chat,skip) {
    return this.http.get(`${environment.URL_API}/message/chat/${chat}/${skip}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  deleteMessage(id) {
    return this.http.delete(`${environment.URL_API}/message/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  readMessages(messages, chat) {
    return this.http.put(
      `${environment.URL_API}/message/read`,
      { messages, chat },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  private idSound$ = new Subject<string>();
  idSound = null;

  /**
   * Avisa a los otros componentes de msg-audio, que un nuevo audio se esta reproduciendo
   */
  playSound(id) {
    this.idSound = id;
    this.idSound$.next(this.idSound);
    console.log(this.idSound$);
    
  }

  /**
   * Un observable para saber cuando empieza a reproducirse un audio
   */

  soundPlaying() {
    return this.idSound$.asObservable();
  }

  /**
   * Vacia un chat por usuario
   */
  clearChat(chat) {
    return this.http.delete(`${environment.URL_API}/message/clear/${chat}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Esta funcion verifica si hay videos, para subir al servidor y retorna la data correcta para el mensaje
   * @param files array con los archivos del mensaje
   * @param videos array con los videos a cargar
   */
  public filesToUploads(files: IPostFile[], videos: any[]): Promise<IPostFile[]> {
    return new Promise(async (resolve) => {
      // hacemos un promise.all para poder utilizar el async await correctamente en el .map
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
}
