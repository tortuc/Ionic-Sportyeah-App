import { INode } from "./INode";
import { ISponsor, ISponsorInfo } from "./ISponsor";

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
  estado: string;
  photoBanner: string;
  country: string;
  structure: INode;
  sport: string;
  sponsors: ISponsor[];
  msgProfile: boolean;
  flag: string;
  sponsor_info: ISponsorInfo;
}

export interface Followers {
  follower: User;
  _id: string;
}

export interface Followings {
  user: User;
  _id: string;
}
