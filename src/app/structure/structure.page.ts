import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/IUser";
import { IUserDataResponse } from "src/app/models/IUserDataResponse";
import { UserService } from "src/app/service/user.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-structure-page",
  templateUrl: "./structure.page.html",
  styleUrls: ["./structure.page.scss"],
})
export class StructurePage implements OnInit {
  /*
   * Usuario dueño de la estructura
   */
  user: User;

  constructor(public route: ActivatedRoute, public userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    /*
     * Obtenemos el usuario segun el username que consigamos en
     * la ruta
     */
    this.userService
      .getUserByUsername(this.route.snapshot.paramMap.get("username"))
      .pipe(take(1))
      .subscribe((userData: IUserDataResponse) => (this.user = userData.user));
  }
}
