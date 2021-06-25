import { User } from "./IUser";

export interface IPost {
  _id: string | string;
  user: User;
  post: IPost | null;
  message: string;
  files: IFile[];
  question:any;
  date: Date;
  edited: Date;
  deleted: boolean;
  news?:any;
  views:any[];
}
export interface INewPost {
  user: string;
  post?: string;
  message?: string;
  files?: IFile[];
}

//Noticia
export interface INew {
  _id: string | string;
  user: User;
  headline: string | null;
  content: [];
  principalImage: string | null;
  principalVideo: string | null;
  sport: string;
  date: Date;
  edited: Date;
  stream: boolean;
  postStream: string;
}

export interface ILike {
  user: User;
  news: string; //revisar si se debe eliminars
  post: string;
  date: Date;
  _id: string;
  deleted: boolean;
  type:number;
}

export interface IComment {
  user: User;
  post: string;
  news: string; //revisar si se debe eliminars
  message: string;
  files: any;
  date: Date;
  _id: string;
  deleted: boolean;
  question:any;
  edited:Date;
}

export interface IPostC {
  post: IPost;
  comments: IComment[];
  shareds: IPost[];
}

export interface INewC {
  news: INew;
  likes: ILike[];
  comments: IComment[];
  shareds: INew[];
}

export interface IFile {
  format?: string;
  url: string;
  name?: string;
}
