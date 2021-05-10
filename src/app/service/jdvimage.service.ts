import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Camera } from "@ionic-native/camera/ngx";
import { environment } from "src/environments/environment";
import { IPostFile } from "../models/iPost";

@Injectable({
  providedIn: "root",
})
export class JdvimageService {
  constructor(private http: HttpClient, private camera: Camera) {}

  /**
   * Sube una imagen al servidor
   * se le debe pasar un formData con un `image` tipo archibo
   * @param {FormData} body
   * @returns url de la imagen
   */
  uploadImage(body: FormData) {
    return this.http.post(`${environment.URL_IMAGE}/image/upload`, body);
  }

  uploadImageProgress(body: FormData, page = false) {
    this.uploadProgress = 0;
    this.isUploadingPage = page;
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.URL_IMAGE}/image/upload`, body, {
          reportProgress: true,
          observe: "events",
        })
        .subscribe(
          (event) => {
            // indicamos que se esta subiendo un archivo
            this.isUploading = true;
            if (event.type == HttpEventType.UploadProgress) {
              // si el evento responde con el tipo upload progress, entonces actualizamos el progreso de carga
              let { loaded, total } = event;
              // el cargado entre el total por 100 da el porcentaje
              this.uploadProgress =
                Number(((loaded / total) * 100).toFixed(0)) || 0;
            } else if (event.type == HttpEventType.Response) {
              // termino la carga, se marca false el is uploading
              this.isUploading = false;
              // si salio ok respondemos con el body
              if (event.status == 200) {
                resolve(event.body);
              } else {
                reject(event);
              }
            }
          },
          (err) => {
            this.isUploading = false;

            reject(err);
          }
        );
    });
  }

  uploadImageFromUrl(url, page = false) {
    this.uploadProgress = 0;
    this.isUploadingPage = page;
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.URL_IMAGE}/image/uploadFromUrl`,
          { url },
          { reportProgress: true, observe: "events" }
        )
        .subscribe(
          (event) => {
            // indicamos que se esta subiendo un archivo
            this.isUploading = true;
            if (event.type == HttpEventType.UploadProgress) {
              // si el evento responde con el tipo upload progress, entonces actualizamos el progreso de carga
              let { loaded, total } = event;
              // el cargado entre el total por 100 da el porcentaje
              this.uploadProgress =
                Number(((loaded / total) * 100).toFixed(0)) || 0;
            } else if (event.type == HttpEventType.Response) {
              // termino la carga, se marca false el is uploading
              this.isUploading = false;
              // si salio ok respondemos con el body
              if (event.status == 200) {
                resolve(event.body);
              } else {
                reject(event);
              }
            }
          },
          (err) => {
            this.isUploading = false;

            reject(err);
          }
        );
    });
  }

  uploadFile(body: FormData) {
    return this.http.post(`${environment.URL_IMAGE}/document/upload`, body);
  }

  getAvatars() {
    return this.http.get(`${environment.URL_IMAGE}/avatar/all`);
  }

  uploadAudio(body: FormData) {
    return this.http.post(`${environment.URL_IMAGE}/audio/upload`, body);
  }

  /**
   * Variable de control para saber si hay un archivo cargandose
   */

  isUploading: boolean = false;

  /**
   * Progreso de carga
   */
  uploadProgress: number = 0;

  /**
   *
   */
  isUploadingPage = false;
  /**
   * subir un video
   */

  uploadVideo(body: FormData, page = false) {
    this.isUploadingPage = page;

    this.uploadProgress = 0;
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.URL_IMAGE}/video/upload`, body, {
          reportProgress: true,
          observe: "events",
        })
        .subscribe(
          (event) => {
            // indicamos que se esta subiendo un archivo
            this.isUploading = true;
            if (event.type == HttpEventType.UploadProgress) {
              // si el evento responde con el tipo upload progress, entonces actualizamos el progreso de carga
              let { loaded, total } = event;
              // el cargado entre el total por 100 da el porcentaje
              this.uploadProgress =
                Number(((loaded / total) * 100).toFixed(0)) || 0;
            } else if (event.type == HttpEventType.Response) {
              // termino la carga, se marca false el is uploading
              this.isUploading = false;
              // si salio ok respondemos con el body
              if (event.status == 200) {
                resolve(event.body);
              } else {
                reject(event);
              }
            }
          },
          (e) => {
            this.isUploading = false;

            reject(e);
          }
        );
    });
  }
  uploadVideoFromUrl(url, page = false) {
    this.isUploadingPage = page;

    this.uploadProgress = 0;
    return new Promise((resolve, reject) => {
      const body = { url };
      return this.http
        .post(`${environment.URL_IMAGE}/video/uploadFromUrl`, body, {
          reportProgress: true,
          observe: "events",
        })
        .subscribe(
          (event) => {
            // indicamos que se esta subiendo un archivo
            this.isUploading = true;
            if (event.type == HttpEventType.UploadProgress) {
              // si el evento responde con el tipo upload progress, entonces actualizamos el progreso de carga
              let { loaded, total } = event;
              // el cargado entre el total por 100 da el porcentaje
              this.uploadProgress =
                Number(((loaded / total) * 100).toFixed(0)) || 0;
            } else if (event.type == HttpEventType.Response) {
              // termino la carga, se marca false el is uploading
              this.isUploading = false;
              // si salio ok respondemos con el body
              if (event.status == 200) {
                resolve(event.body);
              } else {
                reject(event);
              }
            }
          },
          (e) => {
            this.isUploading = false;

            reject(e);
          }
        );
    });
  }


  public DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  /**
   * Retorna todas las imagenes de fondo, de una plantilla de eventos
   * @param type // tipo de plantilla
   * @returns
   */
  getAllBackgrounds(type) {
    return this.http.get(
      `${environment.URL_IMAGE}/background/all/kecuki/${type}`
    );
  }

  takePhoto(): Promise<IPostFile> {
    return new Promise((resolve, reject) => {
      this.camera
        .getPicture({
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          mediaType: this.camera.MediaType.ALLMEDIA,
          encodingType: this.camera.EncodingType.JPEG,
        })
        .then((data) => {
          let base64Image = "data:image/jpeg;base64," + data;
          let blob = this.DataURIToBlob(base64Image);
          let formData = new FormData();
          formData.append("image", blob);

          this.uploadImage(formData).subscribe((url: string) => {
            resolve({
              url,
              format: "image",
            });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  uploadImageServer(formData: FormData): Promise<IPostFile> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.URL_IMAGE}/image/upload`, formData)

        .toPromise()
        .then((url: string) => {
          resolve({
            url,
            format: "image",
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
