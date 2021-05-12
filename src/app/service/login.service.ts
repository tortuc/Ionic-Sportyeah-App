import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

interface Geo {
  ip: string;
  country: string;
  city: string;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  /**
   * Esta funcion retorna el codigo de pais del usuario que se esta registrando
   */

  getCountryCode(): Promise<string> {
    // creamos una promesa que retorna el codigo del pais, o null si ocurre un error en la busqueda
    return new Promise((resolve) => {
      this.http.get("https://extreme-ip-lookup.com/json/").subscribe(
        (response: any) => {
          // destructuramos la informacion y obtenemos solo el countryCode
          let { countryCode } = response;
          // devolvemos el codigo del pais
          resolve(countryCode);
        },
        () => {
          // devolvemos null como respuesta
          resolve(null);
        }
      );
    });
  }

  /**
   * Crea a un usuario
   * @param user
   * @returns
   */
  create(user) {
    return this.http.post(`${environment.URL_API}/user/create`, user);
  }

  auth(body) {
    return this.http.post(`${environment.URL_API}/user/auth`, body);
  }

  connections() {
    return this.http.get(`${environment.URL_API}/user/connections`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  forgot(body) {
    return this.http.post(`${environment.URL_API}/user/forgot`, body);
  }

  verifyToken(token) {
    return this.http.post(`${environment.URL_API}/user/verifytoken`, { token });
  }

  newPassword(body) {
    return this.http.post(`${environment.URL_API}/user/newpassword`, body);
  }

  resend(body) {
    return this.http.post(`${environment.URL_API}/user/resend`, body);
  }

  verification(token) {
    return this.http.post(`${environment.URL_API}/user/verification`, {
      token,
    });
  }

  /**
   * Redirige desde una publicacion, al login para iniciar sesion y volver a la publicacion
   * (solo usar si no hay usuario logueado)
   * @param route ruta al cual se redirige una vez el usuario inicie sesion
   */
  goToLogin(route) {
    this.cookieService.set("login_redirect", route);
    this.router.navigate(["/login"]);
  }
}
