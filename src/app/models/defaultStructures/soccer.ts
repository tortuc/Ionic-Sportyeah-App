import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Soccer {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}8.png`],
    [],
    `Juan`,
    `Entrenador`,
    `Futura leyenda del futbol...`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}9.jpg`],
    [],
    `Juanita`,
    `Entrenador`,
    `Futura leyenda del futbol...`,
    true
  )

  /*
   * Jugadores de Futbol
   */

  antonia: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}2.jpg`],
    [],
    `Antonia`,
    `Portera`,
    `Futura leyenda del futbol...`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}2.jpg`],
    [],
    `Antonio`,
    `Portero`,
    `Futura leyenda del futbol...`,
    true,
  )

  /*
   * Plantillas
   * PL
   */
  
  PLmasculino: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.antonia],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  /*
   * Staff
   * S
   */

  Smasculino: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}10.jpg`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}10.jpg`],
    [this.juanita],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  /*
   * Categorias
   * C
   */

  CcategoriaProfesionalM: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Categoria Profesional`,
    `Primer Equipo`,
    `Nuestra mejor selección`,
     true
  )

  CcategoriaProfesionalF: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Categoria Profesional`,
    `Primer Equipo`,
    `Nuestra mejor selección`,
     true
  )

  CbenjaminesM: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Benjamines`,
    `Benjamines`,
    `Nuestra mejor selección`,
    true,
  )

  CbenjaminesF: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Benjamines`,
    `Benjamines`,
    `Nuestra mejor selección`,
    true,
  )

  CalevinesM: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Alevines`,
    `Alevines`,
    `Nuestra mejor selección`,
    true,
  )

  CalevinesF: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Alevines`,
    `Alevines`,
    `Nuestra mejor selección`,
    true,
  )

  CinfantilM: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Infantil`,
    `Infantil`,
    `Nuestra mejor selección`,
    true,
  )

  CinfantilF: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Infantil`,
    `Infantil`,
    `Nuestra mejor selección`,
    true,
  )

  CcadeteM: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Cadete`,
    `Cadete`,
    `Nuestra mejor selección`,
    true
  )


  CcadeteF: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Cadete`,
    `Cadete`,
    `Nuestra mejor selección`,
    true
  )

  CjuvenilM: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [ this.Smasculino, this.PLmasculino ],
    `Juvenil`,
    `Juvenil`,
    `Nuestra mejor selección`,
    true,
  )

  CjuvenilF: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [this.Sfemenino, this.PLfemenino],
    `Juvenil`,
    `Juvenil`,
    `Nuestra mejor selección`,
    true,
  )
  
  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [
      this.CcategoriaProfesionalM,
      this.CbenjaminesM,
      this.CalevinesM,
      this.CinfantilM,
      this.CcadeteM,
      this.CjuvenilM,
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}4.jpg`],
    [
      this.CcategoriaProfesionalF,
      this.CbenjaminesF,
      this.CalevinesF,
      this.CinfantilF,
      this.CcadeteF,
      this.CjuvenilF
    ],
    `Femenino`,
    `División Femenina`,
    `Nuestra famosa selección, lo mejor de lo mejor`,
    true,
  )



  /*
   * Puestos gerenciales
   * PG
   */

  PGpresidente: NodeStructure = new NodeStructure (
    [`${this.assetsRoute}7.jpg`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}7.jpg`],
    [],
    `Director Comunicación`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  /*
   * Organigrama
   */

  organigrama: NodeStructure = new NodeStructure(
    [`${this.assetsRoute}6.png`],
    [
      this.PGpresidente,
      this.PGdirectorGeneral,
      this.PGdirectorDeportivo,
      this.PGdirectorRRHH,
      this.PGdirectorFinanciero,
      this.PGdirectorProyectos,
      this.PGdirectorComunicacion
    ],
    `Organigrama`,
    `Organigrama`,
    `Junta directiva del club encargada de...`,
    false,
  )

  /*
   * Estructura para soccer
   */

  structure: NodeStructure = new NodeStructure(
    [this.defaultImg],
    [
      this.organigrama,
      this.DMasculina,
      this.DFemenino
    ],
    `Club`,
    `Nuestro Gran Club`,
    `Aquí encontraras toda la información de nuestro club.`,
    true
  )

}
