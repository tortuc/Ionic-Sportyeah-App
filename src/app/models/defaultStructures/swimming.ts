import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Swimming {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Nuestra mejor selección`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonia`,
    `Portera`,
    `Nuestra mejor selección`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selección`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selección`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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

  Libre: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Libre`,
    `Libre`,
    `Nuestra mejor selección`,
     true
  )

  Libref: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Libre`,
    `Libre`,
    `Nuestra mejor selección`,
     true
  )

  Espalda: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Espalda`,
    `Espalda`,
    `Nuestra mejor selección`,
    true,
  )

  Espaldaf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Espalda`,
    `Espalda`,
    `Nuestra mejor selección`,
    true,
  )

  Braza: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Braza`,
    `Braza`,
    `Nuestra mejor selección`,
    true,
  )

  Brazaf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Braza`,
    `Braza`,
    `Nuestra mejor selección`,
    true,
  )

  Mariposa: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Mariposa`,
    `Mariposa`,
    `Nuestra mejor selección`,
    true,
  )

  Mariposaf: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Mariposa`,
    `Mariposa`,
    `Nuestra mejor selección`,
    true,
  )

  Estilos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Estilos`,
    `Estilos`,
    `Nuestra mejor selección`,
    true
  )


  Estilosf: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Estilos`,
    `Estilos`,
    `Nuestra mejor selección`,
    true
  )

  Saltos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Saltos`,
    `Saltos`,
    `Nuestra mejor selección`,
    true,
  )

  Saltosf: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Saltos`,
    `Saltos`,
    `Nuestra mejor selección`,
    true,
  )

  Trampolín: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Trampolín`,
    `Trampolín`,
    `Nuestra mejor selección`,
    true,
  )

  Trampolínf: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Trampolín`,
    `Trampolín`,
    `Nuestra mejor selección`,
    true,
  )

  Plataforma: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Plataforma`,
    `Plataforma`,
    `Nuestra mejor selección`,
    true,
  )

  Plataformaf: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Plataforma`,
    `Plataforma`,
    `Nuestra mejor selección`,
    true,
  )

  Waterpolo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Waterpolo`,
    `Waterpolo`,
    `Nuestra mejor selección`,
    true,
  )

  Waterpolof: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Waterpolo`,
    `Waterpolo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaSolo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Natación Sincronizada - Solo`,
    `Natación Sincronizada - Solo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaSolof: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Natación Sincronizada - Solo`,
    `Natación Sincronizada - Solo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaDuo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Natación Sincronizada - Dúo`,
    `Natación Sincronizada - Dúo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaDuof: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Natación Sincronizada - Dúo`,
    `Natación Sincronizada - Dúo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaEquipo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Natación Sincronizada - Equipo`,
    `Natación Sincronizada - Equipo`,
    `Nuestra mejor selección`,
    true,
  )

  SincronizadaEquipof: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Natación Sincronizada - Equipo`,
    `Natación Sincronizada - Equipo`,
    `Nuestra mejor selección`,
    true,
  )

  Sincronizadaagua: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Natación Sincronizada - Aguas abiertas`,
    `Natación Sincronizada - Aguas abiertas`,
    `Nuestra mejor selección`,
    true,
  )

  Sincronizadaaguaf: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Natación Sincronizada - Aguas abiertas`,
    `Natación Sincronizada - Aguas abiertas`,
    `Nuestra mejor selección`,
    true,
  )
  
  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.Libre,
      this.Espalda,
      this.Braza,
      this.Mariposa,
      this.Estilos,
      this.Trampolín,
      this.Saltos,
      this.Plataforma,
      this.Waterpolo,
      this.SincronizadaSolo,
      this.SincronizadaDuo,
      this.SincronizadaEquipo,
      this.Sincronizadaagua
    ],
    `Masculino`,
    `División Masculina`,
    `Nuestra selección de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.Libref,
      this.Espaldaf,
      this.Brazaf,
      this.Mariposaf,
      this.Estilosf,
      this.Saltosf,
      this.Trampolín,
      this.Plataformaf,
      this.Waterpolo,
      this.SincronizadaSolof,
      this.SincronizadaDuof,
      this.SincronizadaEquipof,
      this.Sincronizadaaguaf
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
    [`https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
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
