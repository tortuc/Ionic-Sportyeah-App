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

export interface ICategory {
  division: IDivision;
  _id?: string;
  name: string;
  description?: string;
  date?: Date;
  deleted?: boolean;
  image: string;
}
export interface ITeam {
  category: ICategory;
  _id?: string;
  name: string;
  description?: string;
  date?: Date;
  deleted?: boolean;
  image: string;
}

export enum PlayerRole {
  staff = "staff",
  player = "player",
}

export interface IPlayer {
  name: string;
  position: string;
  birthday: Date;
  place: string;
  height?: string;
  photo: string;
  role: PlayerRole;
  _id?: string;
  team: ITeam;
  history: string;
  user?: User;
  deleted:boolean;
}
