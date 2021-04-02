import { ISponsor } from "src/app/models/ISponsor"
/*
 * Un nodo puede ser un jugador, una directiva, un staff, toma la forma de lo
 * que se desee
 */
export interface INode {
  /*
   * Id del nodo numerico unicamente representativo
   */
  id?: number
  /*
   * Contenido multimedia maximo 3 imagenes o videos
   */
  media: string[]
  /*
   * Que contiene el nodo
   */
  subtitle: string
  /*
   * Titulo del nodo
   */
  title: string
  /*
   * Texto descriptivo del nodo
   */
  text: string
  /*
   *
   */
  sponsors: ISponsor[]
  /*
   * Estructuras de menor gerarquia
   */
  childs: INode[]
  /*
   * Link del usuario si tiene un usuario linkeado
   */
  idUser?: string
  /*
   * Permite saber si el nodo es inmodificable
   */
  canEdit: boolean
  /*
   * Link para facebook
   */
  facebook: string
  /*
   * Link para twitter
   */
  twitter: string
  /*
   * Link para instagram
   */
  instagram: string
  /*
   * Link para LinkedIn
   */
  linkedin: string
  /*
   * Pagina web
   */
  webPage: string
  /*
   * Fecha de fundación o inicio
   */
  initDate: Date
}
