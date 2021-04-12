import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Boxing {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Nuestra mejor selección`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Antonia`,
    `Portera`,
    `Nuestra mejor selección`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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

  PesoMosca: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Mosca`,
    `Peso Mosca`,
    `Nuestra mejor selección`,
     true
  )

  PesoMoscaf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Mosca`,
    `Peso Mosca`,
    `Nuestra mejor selección`,
     true
  )

  PesoGallo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Gallo`,
    `Peso Gallo`,
    `Nuestra mejor selección`,
     true
  )

  PesoGallof: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Gallo`,
    `Peso Gallo`,
    `Nuestra mejor selección`,
     true
  )

  PesoPluma: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Pluma`,
    `Peso Pluma`,
    `Nuestra mejor selección`,
     true
  )

  PesoPlumaf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Pluma`,
    `Peso Pluma`,
    `Nuestra mejor selección`,
     true
  )

  PesoLigero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Ligero`,
    `Peso Ligero`,
    `Nuestra mejor selección`,
     true
  )

  PesoLigerof: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Ligero`,
    `Peso Ligero`,
    `Nuestra mejor selección`,
     true
  )

  PesoWélter: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Wélter`,
    `Peso Wélter`,
    `Nuestra mejor selección`,
     true
  )

  PesoWélterf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Wélter`,
    `Peso Wélter`,
    `Nuestra mejor selección`,
     true
  )

  PesoMediano: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Mediano`,
    `Peso Mediano`,
    `Nuestra mejor selección`,
     true
  )

  PesoMedianof: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Mediano`,
    `Peso Mediano`,
    `Nuestra mejor selección`,
     true
  )
  
  PesoPesado: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Peso Pesado`,
    `Peso Pesado`,
    `Nuestra mejor selección`,
     true
  )

  PesoPesadof: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Peso Pesado`,
    `Peso Pesado`,
    `Nuestra mejor selección`,
     true
  )
  
  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [
      this.PesoMosca,
      this.PesoGallo,
      this.PesoPluma,
      this.PesoLigero,
      this.PesoWélter,
      this.PesoMediano,
      this.PesoPesado
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [
      this.PesoMosca,
      this.PesoGallof,
      this.PesoPlumaf,
      this.PesoLigerof,
      this.PesoWélterf,
      this.PesoMedianof,
      this.PesoPesadof
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
    [`https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80`],
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
