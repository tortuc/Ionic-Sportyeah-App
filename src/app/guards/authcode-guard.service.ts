import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "../models/IUser";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthCodeGuardService {
  constructor(private UserService: UserService, private router: Router) {}

  async canActivate() {
    return this.UserService.verifyToken()
      .then((user:User) => {
        if(user.codeAuth != null){
          this.router.navigate(["/dashboard"])
          return false
        }else{

          return true;
        }
      })
      .catch(() => {
        this.router.navigate(["/"]);

        return false;
      });
  }
}
