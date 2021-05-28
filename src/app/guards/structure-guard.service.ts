import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: "root",
})
export class StructureGuardService {
  constructor(private UserService: UserService, private router: Router) {}

  async canActivate() {
    return this.UserService.verifyToken()
      .then((resp) => {
        if(['club'].includes(this.UserService.User.profile_user)){
          return true
        }else{
          this.router.navigate(['/'])
          return false;
        }
        
      })
      .catch(() => {
        this.router.navigate(["/"]);

        return false;
      });
  }
}
