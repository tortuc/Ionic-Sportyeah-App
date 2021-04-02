import { Injectable } from "@angular/core"
import { INode } from "src/app/models/INode"

@Injectable({
  providedIn: "root",
})
export class Structures {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  Organigrama: INode = {
    id: 2,
    media: [`${this.assetsRoute}6.png`],
    subtitle: `Organigrama`,
    title: `Organigrama`,
    text: `Junta directiva del club encargada de...`,
    sponsors:[],
    canEdit: false,
    childs: [
      {
        id:17,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Presidente`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:18,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director General`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:10,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director Deportivo`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:11,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director RRHH`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:12,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director Financiero`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:13,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director de Proyectos`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      },
      {
        id:14,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director Comunicación`,
        title: `Pepe Escamilla`,
        text: `Director Ejecutivo de nuestro club, encargado de...`,
        canEdit: true,
        sponsors:[],
        childs:[]
      }
    ],
  };
  Masculina: INode = {
    id: 4,
    media: [`${this.assetsRoute}4.jpg`],
    subtitle: `Masculino`,
    title: `División Masculina`,
    text: `Nuestra selección de jovenes mejor preparados`,
    sponsors:[],
    canEdit: false,
    childs: [
      {
        id:33,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Categoria Profesional`,
        title:`Primer Equipo`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:30,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Benjamines`,
        title:`Benjamines`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:31,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Alevines`,
        title:`Alevines`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:31,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Infantil`,
        title:`Infantil`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:32,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Cadete`,
        title:`Cadete`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:34,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Juvenil`,
        title:`Juvenil`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juan`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
    ],
  };
  Femenino: INode = {
    id: 5,
    media: [`${this.assetsRoute}4.jpg`],
    subtitle: `Femenino`,
    title: `División Femenina`,
    text: `Nuestra famosa selección, lo mejor de lo mejor`,
    canEdit: true,
    sponsors:[],
    childs: [
      {
        id:53,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Categoria Profesional`,
        title:`Primer Equipo`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:50,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Benjamines`,
        title:`Benjamines`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:51,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Alevines`,
        title:`Alevines`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:51,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Infantil`,
        title:`Infantil`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:52,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Cadete`,
        title:`Cadete`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
      {
        id:54,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Juvenil`,
        title:`Juvenil`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:30,
            media:[`${this.assetsRoute}8.png`],
            title: `Juanita`,
            subtitle:`Entrenador`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          },
          {
            id:30,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonia`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      },
    ],
  }
  /*
   * Estructura para soccer
   */
  Soccer: INode = {
    id: 1,
    media: [this.defaultImg],
    subtitle: `Club`,
    title: `Nuestro Gran Club`,
    text: `Aquí encontraras toda la información de nuestro club.`,
    sponsors:[],
    canEdit: true,
    childs: [
      this.Organigrama,
      this.Masculina,
      this.Femenino
    ]
  }
}
