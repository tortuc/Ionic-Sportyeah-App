import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../models/IUser";

@Pipe({
  name: "flagCountry",
})
export class FlagCountryPipe implements PipeTransform {
  transform(user: User): unknown {
    // si el usuario tiene pais y no tiene bandera entonces mostramos la bandera adecuada con la ayuda de countryflag
    if (user.country && !user.flag) {
      return `https://www.countryflags.io/${user.country}/flat/64.png`;
    } else if (user.country && user.flag != null) {
      // si tiene pais y tiene bandera significa que eligio una de euskal o catalunya
      return `assets/flags/${user.flag}.png`;
    } else {
      // de lo contrario hay un error y no mostramos nada
      return null;
    }
  }
}
