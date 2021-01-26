import { User } from '../service/user.service';

export interface IFile {
    url:string
    name?:string
    type:string
}

export interface IWish {
    date:Date
    description:string
    done:boolean
    endDate:Date
    files: IFile[]
    list:string
    location:string
    price:number
    privacity: 'public' | 'private'
    title:string
    type: 'activity' | 'article'
    user: User
    _id:string
}
