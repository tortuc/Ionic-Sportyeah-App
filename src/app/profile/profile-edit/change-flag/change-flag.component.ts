import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "change-flag",
  templateUrl: "./change-flag.component.html",
  styleUrls: ["./change-flag.component.scss"],
})
export class ChangeFlagComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {}

  change(flag) {
    this.userService.update({ flag }).subscribe((user: User) => {
      this.userService.User = user;
    });
  }

  flags = [
    {
      name: null,
      src: "assets/flags/espania.png",
      translate: "change_flag.es",
    },
    {
      name: "euskal",
      src: "assets/flags/euskal.png",
      translate: "change_flag.eu",
    },

    {
      name: "catalunya",
      src: "assets/flags/catalunya.png",
      translate: "change_flag.ca",
    },
    {
      name: "andalucia",
      src: "assets/flags/andalucia.png",
      translate: "change_flag.an",
    },
    {
      name: "aragon",
      src: "assets/flags/aragon.png",
      translate: "change_flag.ar",
    },

    {
      name: "baleares",
      src: "assets/flags/baleares.png",
      translate: "change_flag.bl",
    },
    {
      name: "canarias",
      src: "assets/flags/canarias.png",
      translate: "change_flag.can",
    },
    {
      name: "cantabria",
      src: "assets/flags/cantabria.png",
      translate: "change_flag.cb",
    },

    {
      name: "castilla_mancha",
      src: "assets/flags/castilla_mancha.png",
      translate: "change_flag.cm",
    },
    {
      name: "castilla_leon",
      src: "assets/flags/castilla_leon.png",
      translate: "change_flag.cl",
    },
    {
      name: "valencia",
      src: "assets/flags/valencia.png",
      translate: "change_flag.va",
    },
    {
      name: "extremadura",
      src: "assets/flags/extremadura.png",
      translate: "change_flag.ex",
    },
    {
      name: "asturias",
      src: "assets/flags/asturias.png",
      translate: "change_flag.as",
    },
    {
      name: "galicia",
      src: "assets/flags/galicia.png",
      translate: "change_flag.gl",
    },
    {
      name: "rioja",
      src: "assets/flags/rioja.png",
      translate: "change_flag.lr",
    },
    {
      name: "madrid",
      src: "assets/flags/madrid.png",
      translate: "change_flag.ma",
    },
    {
      name: "murcia",
      src: "assets/flags/murcia.png",
      translate: "change_flag.mu",
    },
    {
      name: "navarra",
      src: "assets/flags/navarra.png",
      translate: "change_flag.na",
    },
  ];
}
