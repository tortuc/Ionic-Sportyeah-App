import { User } from "src/app/service/user.service"
export interface IUserDataResponse {
  user: User;
  friends: {
    followers: number;
    followings: number;
  };
  posts: number;
  connected: boolean;
}
