import { Injectable } from "@angular/core"
import { Soccer } from "src/app/models/defaultStructures/soccer"
import { INode } from "src/app/models/INode"

@Injectable({
  providedIn: "root",
})
export class Structures {
  constructor(
    public soccer: Soccer
  ){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  
  Soccer: INode = this.soccer.structure
}
