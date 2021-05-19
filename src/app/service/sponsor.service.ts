import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISponsor } from "../models/ISponsor";
import { User } from "../models/IUser";

@Injectable({
  providedIn: "root",
})
export class SponsorService {
  constructor(private readonly http: HttpClient) {}

  private readonly route = `${environment.URL_API}/sponsor`;

  /**
   * Crea un patrocinador
   * @param sponsor cuerpo del patrocinador
   * @returns
   */

  createSponsor(sponsor: ISponsor) {
    return this.http.post<ISponsor>(`${this.route}/create`, sponsor);
  }
  /**
   * Obtiene todos los patrocinadores de un usuario
   * @param idUser _id del usuario
   * @returns
   */

  getAllSponsorsUserById(idUser: string) {
    return this.http.get<ISponsor[]>(`${this.route}/all/${idUser}`);
  }

  /**
   * Busca a todos los usuarios patrocinadores que coincidan con una query
   * @param query busqueda o cadena de texto
   *
   */
  getSponsorsUsersByQuery(query: string = '') {
    return this.http.get<User[]>(`${this.route}/query/${query}/0`);
  }
}
