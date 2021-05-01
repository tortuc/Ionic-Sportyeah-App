import { User } from "./IUser";


export interface IChat {
    _id:string
    sender:User
    receiver:User
    date:Date
}

export interface IMessage {
    _id:string
    date:Date
    user:User
    message:string
    image:string
    read:boolean
    audio:string
    deleted:boolean
    video:string
    document:any
}

export interface IChatList {
    chat:IChat
    lastMessage:IMessage
    unreads:number
}