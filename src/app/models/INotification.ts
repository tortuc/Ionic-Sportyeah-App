import { IComment, IPost } from "./iPost";
import { User } from "./IUser";

export interface INotification {
  user: User;
  friend: User;
  like: number;
  action:
    | "follow"
    | "unfollow"
    | "mention"
    | "mention_comment"
    | "like"
    | "shared"
    | "comment"
    | "questionEnd"
    | "invited_event"
    | "news_created";
  date: Date;
  deleted: boolean;
  comment: IComment;
  read: boolean;
  routerlink: string;
  _id: string;
  post: IPost;
  news: any;
  question: string;
}
