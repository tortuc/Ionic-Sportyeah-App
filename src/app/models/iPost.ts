import { User } from '../service/user.service';

export interface IPost {
    _id:string | string
    user:User
    post:string | null
    message:string
    image:string | null
    video:string | null
    date:Date
    edited:Date
}

export interface ILike {
    user:User
    post:string
    date:Date
    _id:string
    deleted:boolean

}

export interface IComment{
    user:User
    post:string
    message:string
    image:string
    date:Date
    _id:string
    deleted:boolean
}


export interface IPostC {
    post:IPost
    likes:ILike[]
    comments:IComment[]
    shareds:IPost[]
}

export function hola(){
    
}