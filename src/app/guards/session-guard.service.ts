import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";

import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: "root",
})
export class SessionGuardService {
  constructor(private UserService: UserService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    console.log("Verificando");

    return this.UserService.verifyToken()
      .then((resp) => {
        console.log("Verificado");

        if (route.queryParams?.ref != undefined) {
          this.router.navigate([`/dashboard`], {
            queryParams: route.queryParams,
          });
        } else {
          this.router.navigate(["/dashboard"]);
        }

        return false;
      })
      .catch(() => {
        return true;
      });
  }
}
