import { User } from "./IUser";

/*
 * El sponsor (patrocinador) es una marca
 */
export interface ISponsor {
  customSponsor?: ISponsorInfo;
  /*
   * _id del sponsor en sportyeah, o el cuerpo del mismo
   */
  idSponsor?: User | string;
  /*
   * _id del usuario que creo el sponsor
   */
  user: string;
}

export interface ISponsorInfo {
  name: string;
  miniature: string;
  profile_image: string;
  url?: string;
}
