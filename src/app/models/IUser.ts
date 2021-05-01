import { IGeo } from "./IGeo";
import { INode } from "./INode";
import { ISponsor } from "./ISponsor";
export interface IUser {
  name: string;
  last_name: string;
  email: string;
  role: string;
  photo: string;
  photoBanner: string;
  slider: string[];
  estado: string;
  phone: string;
  birth_date: Date;
  username: string;
  profile_user: string;
  parents_email: string;
  parents_last_name: string;
  parents_name: string;
  sport: string;
  sub_profile: string;
  _id: string;
  attempts: number;
  create: Date;
  deleted: boolean;
  recover_password_token: string;
  verification_token: string;
  verified: boolean;
  lastConection: Date;
  connected: boolean;
  sponsors: ISponsor[];
  structure: INode;
  geo: IGeo;
}

export interface User {
  name: string;
  last_name: string;
  email: string;
  role: string;
  photo: string;
  phone: string;
  _id: string;
  birth_date: Date;
  username: string;
  lastConection: Date;
  connected: boolean;
  lang: string;
  tutorial: boolean;
  fcmtoken: string;
  profile_user: string;
  slider: string[];
  estado: string;
  photoBanner: string;
  geo: IGeo;
  structure: INode;
  sport: string;
  sponsors: ISponsor[];

}

export interface Followers {
  follower: User;
  _id: string;
}

export interface Followings {
  user: User;
  _id: string;
}
