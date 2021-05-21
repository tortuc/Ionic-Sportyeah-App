import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { User } from "src/app/models/IUser";
import { LoginService } from "src/app/service/login.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "miniflag",
  templateUrl: "./miniflag.component.html",
  styleUrls: ["./miniflag.component.scss"],
})
export class MiniflagComponent implements OnInit {
  @Input() user: User;
  @Input() edit?: boolean;

  constructor(
    public mc: ModalController,
    public userService: UserService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.verifyCountryUser();
  }

  /**
   * Esta funcion verifica que el usuario tenga un pais y si no lo tiene, le asigna uno mediante su ip
   */
  async verifyCountryUser() {
    // primero evaluamos que el usuario que esta mostrando la bandera, es el mismo usuario que inicio sesion ( o sea yo mismo )
    if (this.user._id == this.userService.User._id) {
      // si es el mismo usuario entonces evaluamos si no  tiene pais
      if (this.user.country == null) {
        // si es nulo entonces consultamos al login service cual es el countryCode del usuario y lo guardamos en la base de datos
        let country = await this.loginService.getCountryCode();
        this.userService.update({ country }).subscribe(() => {
          // una vez en la base de datos lo guardamos localmente para poder mostrar la bandera
          this.userService.User.country = country;
          this.user.country = country;
        });
      } else {
        // si tiene pais no hacemos nada
      }
    } else {
      // si el usuario no es el mismo, significa que esta visitando otro perfil,
      // por lo tanto no hacemos nada para no modificar datos de otro usuario
    }
  }
}
