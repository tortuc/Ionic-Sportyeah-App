import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Golf {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Nuestra mejor selección`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juanita`,
    `Entrenador`,
    `Nuestra mejor selección`,
    true
  )

  /*
   * Jugadores
   */

  antonia: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonia`,
    `Pivot`,
    `Nuestra mejor selección`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonio`,
    `Pivot`,
    `Nuestra mejor selección`,
    true,
  )

  /*
   * Plantillas
   * PL
   */
  
  PLmasculino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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

  PRIMERA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `1ª categoría`,
    `1ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  PRIMERAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `1ª categoría`,
    `1ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  SEGUNDA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `2ª categoría`,
    `2ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  SEGUNDAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `2ª categoría`,
    `2ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  TERCERA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `3ª categoría`,
    `3ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  TERCERAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `3ª categoría`,
    `3ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  CUARTA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `4ª categoría`,
    `4ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  CUARTAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `4ª categoría`,
    `4ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  QUINTA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `5ª categoría`,
    `5ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  QUINTAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `5ª categoría`,
    `5ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  SEXTA: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `6ª categoría`,
    `6ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  SEXTAF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `6ª categoría`,
    `6ª categoría`,
    `Nuestra mejor selección`,
     true
  )

  
  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.PRIMERA,
      this.SEGUNDA,
      this.TERCERA,
      this.CUARTA,
      this.QUINTA,
      this.SEXTA,
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.PRIMERAF,
      this.SEGUNDAF,
      this.TERCERAF,
      this.CUARTAF,
      this.QUINTAF,
      this.SEXTAF,
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
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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