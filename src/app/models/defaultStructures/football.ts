import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Football {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Nuestra mejor selección`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juanita`,
    `Entrenador`,
    `Nuestra mejor selección`,
    true
  )

  /*
   * Jugadores de Futbol
   */

  antonia: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonia`,
    `Portera`,
    `Nuestra mejor selección`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonio`,
    `Portero`,
    `Nuestra mejor selección`,
    true,
  )

  /*
   * Plantillas
   * PL
   */
  
  PLmasculino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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

  BABYSFLAG: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `BABYS FLAG`,
    `BABYS FLAG`,
    `Nuestra mejor selección`,
     true
  )

  BABYSFLAGf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `BABYS FLAG`,
    `BABYS FLAG`,
    `Nuestra mejor selección`,
     true
  )

  BABYSEQUIPADOS: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `BABYS EQUIPADOS`,
    `BABYS EQUIPADOS`,
    `Nuestra mejor selección`,
     true
  )

  BABYSEQUIPADOSf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `BABYS EQUIPADOS`,
    `BABYS EQUIPADOS`,
    `Nuestra mejor selección`,
     true
  )

  INFANTIL: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `INFANTIL`,
    `INFANTIL`,
    `Nuestra mejor selección`,
     true
  )

  INFANTILf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `INFANTIL`,
    `INFANTIL`,
    `Nuestra mejor selección`,
     true
  )

  JUVENIL: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `JUVENIL`,
    `JUVENIL`,
    `Nuestra mejor selección`,
     true
  )

  JUVENILf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `JUVENIL`,
    `JUVENIL`,
    `Nuestra mejor selección`,
     true
  )

  INTERMEDIA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `INTERMEDIA`,
    `INTERMEDIA`,
    `Nuestra mejor selección`,
     true
  )

  INTERMEDIAf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `INTERMEDIA`,
    `INTERMEDIA`,
    `Nuestra mejor selección`,
     true
  )

  LIGAMAYOR: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `LIGA MAYOR`,
    `LIGA MAYOR`,
    `Nuestra mejor selección`,
     true
  )

  LIGAMAYORf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `LIGA MAYOR`,
    `LIGA MAYOR`,
    `Nuestra mejor selección`,
     true
  )


  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.BABYSFLAG,
      this.BABYSEQUIPADOS,
      this.INFANTIL,
      this.JUVENIL,
      this.INTERMEDIA,
      this.LIGAMAYOR
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.BABYSFLAGf,
      this.BABYSEQUIPADOSf,
      this.INFANTILf,
      this.JUVENILf,
      this.INTERMEDIAf,
      this.LIGAMAYORf
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
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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

  estructuraClub: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.DMasculina,this.DMasculina],
    `Estructura Club`,
    `Estructura Club`,
    `Esta es la estructura de nuestro club`,
    false
  )

  structure: NodeStructure = new NodeStructure(
    [this.defaultImg],
    [
      this.organigrama,
      this.estructuraClub
    ],
    `Club`,
    `Nuestro Gran Club`,
    `Aquí encontraras toda la información de nuestro club.`,
    true
  )

}
