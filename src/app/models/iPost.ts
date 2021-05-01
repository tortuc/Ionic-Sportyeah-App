import { User } from "./IUser";

export interface IPost {
  _id: string | string;
  user: User;
  post: string | null;
  message: string;
  files: IPostFile[];

  date: Date;
  edited: Date;
  deleted: boolean;
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

export interface IPostFile {
  fileType?: string;
  url: string;
  name?: string;
}
