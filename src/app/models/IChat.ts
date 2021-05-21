import { IFile } from './iPost';
import { User } from './IUser';

export interface IChat {
    _id:string
    sender:User
    receiver:User
    date:Date
    group:boolean
    group_privacy:string
    image:string
    users:User[]
    admins:string[]
    pending:User[]
    closed:boolean
    name:string
}

export interface IMessage {
    _id:string
    date:Date
    user:User
    message:string
    read:boolean
    audio:string
    question:string
    deleted:boolean
    information:any
    files:IFile[]
}

export interface IChatList {
    chat:IChat
    lastMessage:IMessage
    unreads:number
}