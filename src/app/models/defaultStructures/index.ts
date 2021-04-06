import { Football } from './football';
import { Injectable } from "@angular/core"
import { Soccer } from "src/app/models/defaultStructures/soccer"
import { INode } from "src/app/models/INode"
import { Baseball } from "./baseball"
import { Basketball } from "./basketball"
import { Boxing } from "./boxing"
import { Golf } from "./golf"
import { Rugby } from "./rugby"
import { Running } from "./running"
import { Swimming } from "./swimming"
import { TableTennis } from "./table_tennis"
import { Tennis } from "./tenis"
import { VolleyBall } from "./volleyball"
import { Esport } from './esport';

@Injectable({
  providedIn: "root",
})
export class Structures {
  constructor(
    public Soccer: Soccer,
    public Basketball: Basketball,
    public Tennis: Tennis,
    public Baseball: Baseball,
    public Running: Running,
    public Volleyball: VolleyBall,
    public Swimming: Swimming,
    public Boxing: Boxing,
    public TableTennis: TableTennis,
    public Golf: Golf,
    public Football: Football,
    public Esport: Esport,
    public Rugby: Rugby
  ){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  
  soccer: INode             = this.Soccer.structure
  basketball: INode         = this.Basketball.structure
  tennis: INode             = this.Tennis.structure
  baseball: INode           = this.Baseball.structure
  running: INode            = this.Running.structure
  volleyball: INode         = this.Volleyball.structure
  swimming: INode           = this.Swimming.structure
  boxing: INode             = this.Boxing.structure
  table_tennis: INode       = this.TableTennis.structure
  golf: INode               = this.Golf.structure
  rugby: INode              = this.Rugby.structure
  football: INode           = this.Football.structure
  esport: INode             = this.Esport.structure
  various: INode            = this.Soccer.structure
}
