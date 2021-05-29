import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { StructureService } from "../service/structure.service";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: "root",
})
export class StructureGuardService {
  constructor(
    private UserService: UserService,
    private router: Router,
    private readonly structureService: StructureService
  ) {}

  async canActivate() {
    return this.UserService.verifyToken()
      .then((resp) => {
        return this.structureService
          .verifyMyStructure()
          .then(() => {
            return true;
          })
          .catch(() => {
            this.router.navigate(["/"]);

            return false;
          });
      })
      .catch(() => {
        this.router.navigate(["/"]);

        return false;
      });
  }
}
