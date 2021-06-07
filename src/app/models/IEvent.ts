import { User } from "./IUser";

export interface IEvent {
    user    : string | User;
    open    : boolean;
    register    : boolean;
    importPrice:string;
    currency:string;
    buyCondition:string;
    devolutionCondition:string;
    title: string;
    colorTitle: string;
    description: string;
    colorDescription: string;
    date        : Date
    modality: string;
    principalImage:string;
    principalVideo:string;
    audioNews:string;
    stream  : boolean;
    postStream : string;
    pusblishDate    : Date
    deleted : boolean;
    programatedDate        : Date
    programated       : boolean;
    edited  : Date
    views  : []
  }