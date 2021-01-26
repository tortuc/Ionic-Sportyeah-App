import { User } from '../service/user.service';
import { IComment, IPost } from './iPost';

export interface INotification {
    user:User
    friend:User
    like:number
    action: 'follow' | 'unfollow' | 'mention' | 'mention_comment' | 'like' | 'shared' | 'comment'
    date:Date
    deleted:boolean
    comment:IComment
    read:boolean
    routerlink:string
    _id:string
    post:IPost
}
