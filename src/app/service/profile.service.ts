import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  /**
   * Devuelve la cantidad de post Publicados por un usuario
   * @param id `_id` del usuario
   */
  async getCountPostByUser(id) {
    return await new Promise((resolve, reject) => {
      this.http
        .get(`${environment.URL_API}/post/count/${id}`)
        .toPromise()
        .then((resp:any) => {
          resolve(resp.count);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}
