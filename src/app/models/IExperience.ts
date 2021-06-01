import { IFile } from "./iPost";

export interface IExperience {
  _id: string;
  userId: string;
  position: string;
  federationTeam: string;
  nowIn: boolean;
  place: string;
  initDate: Date;
  finishDate: Date;
  title: string;
  description: string;
  files: IFile[];
  date: Date;
  deleted: boolean;
}