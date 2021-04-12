import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Esport {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Nuestra mejor selección`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonia`,
    `Portera`,
    `Nuestra mejor selección`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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

  lol: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `League of Legends`,
    `League of Legends`,
    `Nuestra mejor selección`,
     true
  )

  lolf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `League of Legends`,
    `League of Legends`,
    `Nuestra mejor selección`,
     true
  )

  cs: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Counter Strike`,
    `Counter Strike`,
    `Nuestra mejor selección`,
     true
  )

  csf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Counter Strike`,
    `Counter Strike`,
    `Nuestra mejor selección`,
     true
  )



  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.cs,
      this.lol
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.csf,
      this.lolf
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
