import { Inject, Injectable } from "@angular/core"
import { ISponsor } from "src/app/models/ISponsor"
import { INode } from "src/app/models/INode"

/*
 * Clase de nodos para generar nodos con menos codigo
 */
@Injectable({
  providedIn: "root",
})
export class NodeStructure {
  id:number
  media:string[]
  title:string
  subtitle:string
  sponsors:ISponsor[]
  facebook:string=`https://www.sportyeah.com/`
  twitter:string=`https://www.sportyeah.com/`
  instagram:string=`https://www.sportyeah.com/`
  linkedin:string=`https://www.sportyeah.com/`
  webPage:string=`https://www.sportyeah.com/`
  initDate:Date=new Date()
  canEdit:boolean
  text:string
  childs:INode[]

  constructor(
    @Inject('media') media: string[], 
    @Inject('childs') childs: INode[],
    @Inject('title') title: string,
    @Inject('subtitle') subtitle: string,
    @Inject('text') text: string,
    @Inject('canEdit') canEdit: boolean,
  ){
    this.id = Math.floor(Math.random() * 10000000000000000000000000000000000000000000000)
    this.media = media
    this.title = title
    this.subtitle = subtitle
    this.canEdit = canEdit
    this.text = text
    this.childs = childs
  }
}


