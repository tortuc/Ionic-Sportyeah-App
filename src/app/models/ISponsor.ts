import { User } from "./IUser";

/*
 * El sponsor (patrocinador) es una marca
 */
export interface ISponsor {
  /*
   * Url de la pagina del patrocinador
   */
  url: string;
  /*
   * Imagen del sponsor
   */
  image: string;
  /*
   * Nombre del sponsor
   */
  name: string;
  /*
   * _id del sponsor en sportyeah, o el cuerpo del mismo
   */
  idSponsor: User | string;
  /*
   * _id del usuario que creo el sponsor
   */
  user: string;
}


export interface ISponsorInfo{
  name:string;
  miniature:string;
  profile_image:string;
}