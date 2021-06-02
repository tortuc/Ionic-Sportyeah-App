import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  ICategory,
  IDivision,
  IOrganization,
  IPlayer,
  IStructure,
  ITeam,
} from "../models/structure.model";
import { LoadingService } from "./loading.service";
import { UserService } from "./user.service";

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
  private readonly routeDivision = `${environment.URL_API}/structure/division`;
  private readonly routeCategory = `${environment.URL_API}/structure/category`;
  private readonly routeTeam = `${environment.URL_API}/structure/team`;
  private readonly routePlayer = `${environment.URL_API}/structure/player`;

  /**
   * Obtiene la estructura de un usuario, por el id del usuario
   */
  getStructureByUser(id) {
    return this.http
      .get<IStructure>(`${this.route}/getbyuser/${id}`)
      .pipe(take(1));
  }
  /**
   * Obtiene la estructura de un usuario, por el username del usuario
   */
  getStructureByUsername(username) {
    return this.http
      .get<IStructure>(`${this.route}/getbyusername/${username}`)
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
   * Obtiene todos los perfiles del organigrama de una estructura mediante el username del usuario a quien pertenece
   * @param username username del User
   * @returns
   */
  getOrganizationByUsername(username: string) {
    return this.http
      .get<IOrganization[]>(`${this.routeOrganization}/byusername/${username}`)
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

  /**
   * -------------------------------------------------------
   * ----------------------- CRUD DIVISION -----------------
   * -------------------------------------------------------
   */

  public newDivision$ = new Subject<IDivision>();

  createDivision(division) {
    this.loadingService.present();
    this.http
      .post<IDivision>(`${this.routeDivision}/create`, division)
      .pipe(take(1))
      .subscribe(
        (division) => {
          this.loadingService.dismiss();
          this.newDivision$.next(division);
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  getAllDivisionsByStructure(id) {
    return this.http
      .get<IDivision[]>(`${this.routeDivision}/bystructure/${id}`)
      .pipe(take(1));
  }

  getDivisionById(id) {
    return this.http
      .get<IDivision>(`${this.routeDivision}/byid/${id}`)
      .pipe(take(1));
  }

  public updatedDivision$ = new Subject<IDivision>();

  updateDivisionById(id, newData) {
    this.loadingService.present();
    this.http
      .put<IDivision>(`${this.routeDivision}/update/${id}`, newData)
      .pipe(take(1))
      .subscribe(
        (division) => {
          this.loadingService.dismiss();
          this.updatedDivision$.next(division);
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  deleteDivisionById(id) {
    return this.http.delete(`${this.routeDivision}/delete/${id}`);
  }

  /**
   * -------------------------------------------------------
   * ------------------ FIN CRUD DIVISION ------------------
   * -------------------------------------------------------
   */

  /**
   * -------------------------------------------------------
   * -------------------- CRUD CATEGORIA ------------------
   * -------------------------------------------------------
   */

  public newCategory$ = new Subject<ICategory>();
  /**
   * Crear una categoria
   * @param category
   */

  createCategory(category) {
    this.loadingService.present();
    this.http
      .post<ICategory>(`${this.routeCategory}/create`, category)
      .pipe(take(1))
      .subscribe(
        (newCategory) => {
          this.newCategory$.next(newCategory);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  /**
   * Obtiene todas las categorias por el id de la division
   * @param divisionId
   * @returns
   */

  getAllCategoryByDivision(divisionId: string) {
    return this.http
      .get<ICategory[]>(`${this.routeCategory}/bydivision/${divisionId}`)
      .pipe(take(1));
  }

  /**
   * Obtiene la informacion de una categoria, por su id
   */
  getCategory(id) {
    return this.http
      .get<ICategory>(`${this.routeCategory}/byid/${id}`)
      .pipe(take(1));
  }

  public categoryUpdated$ = new Subject<ICategory>();

  updateCategory(id, newData) {
    this.loadingService.present();
    this.http
      .put<ICategory>(`${this.routeCategory}/update/${id}`, newData)
      .pipe(take(1))
      .subscribe(
        (category) => {
          this.categoryUpdated$.next(category);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  deleteCategory(id) {
    return this.http
      .delete<ICategory>(`${this.routeCategory}/delete/${id}`)
      .pipe(take(1));
  }

  /**
   * -------------------------------------------------------
   * ------------------ FIN CRUD CATEGORIA ------------------
   * -------------------------------------------------------
   */

  /**
   * -------------------------------------------------------
   * -------------------- CRUD EQUIPO ------------------
   * -------------------------------------------------------
   */

  public newTeam$ = new Subject<ITeam>();
  /**
   * Crear un EQUIPO
   * @param team
   */

  createTeam(team) {
    this.loadingService.present();
    this.http
      .post<ITeam>(`${this.routeTeam}/create`, team)
      .pipe(take(1))
      .subscribe(
        (newTeam) => {
          this.newTeam$.next(newTeam);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  /**
   * Obtiene todas las categorias por el id de la division
   * @param teamId
   * @returns
   */

  getAllTeamsByCategory(teamId: string) {
    return this.http
      .get<ITeam[]>(`${this.routeTeam}/bycategory/${teamId}`)
      .pipe(take(1));
  }

  /**
   * Obtiene la informacion de un equipo, por su id
   */
  getTeam(id) {
    return this.http.get<ITeam>(`${this.routeTeam}/byid/${id}`).pipe(take(1));
  }

  public teamUpdated$ = new Subject<ITeam>();

  updateTeam(id, newData) {
    this.loadingService.present();
    this.http
      .put<ITeam>(`${this.routeTeam}/update/${id}`, newData)
      .pipe(take(1))
      .subscribe(
        (team) => {
          this.teamUpdated$.next(team);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  deleteTeam(id) {
    return this.http
      .delete<ITeam>(`${this.routeTeam}/delete/${id}`)
      .pipe(take(1));
  }

  /**
   * -------------------------------------------------------
   * ------------------ FIN CRUD EQUIPO ------------------
   * -------------------------------------------------------
   */
  /**
   * -------------------------------------------------------
   * -------------------- CRUD JUGADOR/STAFF ------------------
   * -------------------------------------------------------
   */

  public newPlayer$ = new Subject<IPlayer>();
  /**
   * Crear un jugador
   * @param team
   */

  createPlayer(team) {
    this.loadingService.present();
    this.http
      .post<IPlayer>(`${this.routePlayer}/create`, team)
      .pipe(take(1))
      .subscribe(
        (newPlayer) => {
          this.newPlayer$.next(newPlayer);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  /**
   * Obtiene todas los jugadores de un equipo
   * @param teamId
   * @returns
   */

  getAllPlayersByTeam(teamId: string, role = "player") {
    return this.http
      .get<IPlayer[]>(`${this.routePlayer}/byteam/${teamId}/${role}`)
      .pipe(take(1));
  }

  /**
   * Obtiene la informacion de jugador/staff por su id
   */
  getPlayer(id) {
    return this.http
      .get<IPlayer>(`${this.routePlayer}/byid/${id}`)
      .pipe(take(1));
  }

  public playerUpdated$ = new Subject<IPlayer>();

  updatePlayer(id, newData) {
    this.loadingService.present();
    this.http
      .put<IPlayer>(`${this.routePlayer}/update/${id}`, newData)
      .pipe(take(1))
      .subscribe(
        (player) => {
          this.playerUpdated$.next(player);
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      );
  }

  deletePlayer(id) {
    return this.http
      .delete<IPlayer>(`${this.routePlayer}/delete/${id}`)
      .pipe(take(1));
  }

  /**
   * -------------------------------------------------------
   * ------------------ FIN CRUD EQUIPO ------------------
   * -------------------------------------------------------
   */
}
