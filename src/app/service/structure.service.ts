import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ISocialNetworks, User } from "../models/IUser";
import { LoadingService } from "./loading.service";
import { UserService } from "./user.service";

export interface IStructure {
  user: string;
  name: string;
  description: string;
  date: Date;
  socialNetworks: ISocialNetworks;
  _id: string;
}

export interface IOrganization {
  name: string;
  _id?: string;
  user?: User;
  description: string;
  photo: string;
  structure: string | IStructure;
  history: string;
  position: string;
  date?: Date;
  deleted?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class StructureService {
  /**
   * Id de la structura del usuario conectado
   */
  public myStructure: IStructure = null;

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService
  ) {
    userService.logoutObservable().subscribe(() => {
      this.myStructure = null;
    });
  }

  verifyMyStructure(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.myStructure == null) {
        if (["club"].includes(this.userService.User.profile_user)) {
          this.getStructureByUser(this.userService.User._id).subscribe(
            (structure) => {
              this.myStructure = structure;
              resolve(true);
            },
            () => {
              reject(false);
            }
          );
        } else {
          reject(false);
        }
      } else {
        resolve(true);
      }
    });
  }

  private readonly route = `${environment.URL_API}/structure`;
  private readonly routeOrganization = `${environment.URL_API}/structure/organization`;

  /**
   * Obtiene la estructura de un usuario, por el id del usuario
   */
  getStructureByUser(id) {
    return this.http
      .get<IStructure>(`${this.route}/getbyuser/${id}`)
      .pipe(take(1));
  }

  /**
   * Editar la inforamcion de la estructura
   */

  editMyStructure(newData) {
    return new Promise((resolve, reject) => {
      const { _id } = this.myStructure;
      this.http
        .put<IStructure>(`${this.route}/update/${_id}`, newData)
        .pipe(take(1))
        .subscribe(
          (structure) => {
            this.myStructure = structure;
            resolve(true);
          },
          () => {
            reject(false);
          }
        );
    });
  }

  /**
   * -------------------------------------------------------
   * -----------------CRUD ORGANIGRAMA ---------------------
   * -------------------------------------------------------
   */

  public newProfileOrganization$ = new Subject<IOrganization>();

  /**
   * Crear un perfil de organigrama
   */

  createProfileOrganization(profile: IOrganization) {
    this.loadingService.present();
    this.http
      .post<IOrganization>(`${this.routeOrganization}/create`, profile)
      .pipe(take(1))
      .subscribe(
        (profile) => {
          this.loadingService.dismiss();
          this.newProfileOrganization$.next(profile);
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }
  /**
   * Obtiene todos los perfiles del organigrama de una estructura
   * @param structureId
   * @returns
   */
  getOrganizationByStructure(structureId: string) {
    return this.http
      .get<IOrganization[]>(
        `${this.routeOrganization}/bystructure/${structureId}`
      )
      .pipe(take(1));
  }

  /**
   * Obtiene la informacion de un perfil del organigrama
   * @param profileId _id del perfil
   * @returns
   */
  getProfileOrganizationById(profileId: string) {
    return this.http
      .get<IOrganization>(`${this.routeOrganization}/getone/${profileId}`)
      .pipe(take(1));
  }

  public updateProfileOrganization$ = new Subject<IOrganization>();

  /**
   * Edita un perfil de un organigrama
   * @param profileId
   * @param newData
   */
  updateProfileOrganizationById(profileId: string, newData: IOrganization) {
    this.loadingService.present();
    this.http
      .put<IOrganization>(
        `${this.routeOrganization}/update/${profileId}`,
        newData
      )
      .pipe(take(1))
      .subscribe(
        (profile) => {
          this.updateProfileOrganization$.next(profile);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  /**
   * Elimina un perfil de un organigrama
   * @param id
   * @returns
   */
  deleteProfileOrganizationById(id: string) {
    return this.http
      .delete(`${this.routeOrganization}/delete/${id}`)
      .pipe(take(1));
  }

  /**
   * -------------------------------------------------------
   * ------------ FIN CRUD ORGANIGRAMA ---------------------
   * -------------------------------------------------------
   */
}
