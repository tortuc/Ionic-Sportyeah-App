import { User } from "./IUser";

export interface IUserDataResponse {
  user: User;
  friends: {
    followers: number;
    followings: number;
  };
  posts: number;
  connected: boolean;
}
