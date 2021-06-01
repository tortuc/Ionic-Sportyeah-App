import { ISocialNetworks, User } from "./IUser";

export interface IStructure {
  user: string | User;
  name: string;
  description: string;
  date: Date;
  socialNetworks: ISocialNetworks;
  _id: string;
  logo: string;
}

export interface IOrganization {
  name: string;
  _id?: string;
  user?: User;
  description: string;
  photo: string;
  structure: IStructure;
  history: string;
  position: string;
  date?: Date;
  deleted?: boolean;
}

export interface IDivision {
  structure: IStructure;
  _id?: string;
  name: string;
  description: string;
  date?: Date;
  deleted?: boolean;
  image: string;
}
