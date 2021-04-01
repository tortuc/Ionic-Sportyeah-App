import { Injectable } from "@angular/core"
import { INode } from "src/app/models/INode"

@Injectable({
  providedIn: "root",
})
export class Structures {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
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
        id:10,
        media:[`${this.assetsRoute}7.jpg`],
        subtitle: `Director Ejecutivo`,
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
        id:30,
        media:[`${this.assetsRoute}3.jpg`],
        title:`Benjamines`,
        subtitle:`Benjamines`,
        text:`Selección de 8 y 9 años`,
        sponsors:[],
        canEdit: true,
        childs:[
          {
            id:50,
            media:[`${this.assetsRoute}2.jpg`],
            title: `Antonio`,
            subtitle:`Portero`,
            sponsors:[],
            canEdit: true,
            text:`Futura leyenda del futbol...`,
            childs:[]
          }
        ]
      }
    ],
  };
  Femenino: INode = {
    id: 5,
    media: [`${this.assetsRoute}1.jpg`],
    subtitle: `Femenino`,
    title: `División Femenina`,
    text: `Nuestra famosa selección, lo mejor de lo mejor`,
    canEdit: true,
    sponsors:[],
    childs: [
      {
        id:50,
        media: [`${this.assetsRoute}4.jpg`],
        subtitle: `Benjamines`,
        title:`Benjamines`,
        text: `Nuestra mejor selección`,
        sponsors:[],
        canEdit: true,
        childs:[]
      }
    ],
  }
  /*
   * Estructura para soccer
   */
  Soccer: INode = {
    id: 1,
    media: null,
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
