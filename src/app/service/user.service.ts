import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { ChatService } from "./chat.service";
import { getToken } from "../helpers/token";
import { WishService } from "./wish.service";
import { Howl } from "howler";
import { ViewsProfileService } from "./views-profile.service"
import { SocketService } from "./socket.service";
import { ISponsor } from "../models/ISponsor";
interface FollowingsResponse {
  ids: string[];
  followings: Followings[];
}
export interface User {
  name: string;
  last_name: string;
  email: string;
  role: string;
  photo: string;
  photoBanner: string;
  slider: string[];
  estado: string;
  phone: string;
  birth_date: Date;
  username: string;
  profile_user: string;
  parents_email: string;
  parents_last_name: string;
  parents_name: string;
  sport: string;
  sub_profile: string;
  _id: string;
  attempts: number;
  create: Date;
  deleted: boolean;
  recover_password_token: string;
  verification_token: string;
  verified: boolean;
  lastConection: Date;
  connected: boolean;
  sponsors: ISponsor[];
  structure: any;
  geo:any;
}
export interface Followers {
  follower: User;
  _id: string;
}
export interface Followings {
  user: User;
  _id: string;
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private socketService: SocketService,
    private chatService: ChatService,
    private wishService: WishService,
    private viewsProfileService:ViewsProfileService
  ) {}

  public User: User;
  public followers: Followers[] = [];
  public followers_id: string[] = [];
  public followings: Followings[] = [];
  public followings_id: any[] = [];

  setUser(user: User) {
    this.User = user;
    this.wishService.getList(user._id);
  }

  getUser() {
    return this.User;
  }

  public isFollow(id) {
    let following = this.followings_id.find((following: any) => {
      return following.user == id;
    });
    return following ? true : false;
  }

  public unFollow(user) {
    let following = this.followings_id.find((following: any) => {
      return following.user == user;
    });

    if (following) {
      this.unFollowApi(following._id)
        .toPromise()
        .then((follow) => {
          this.updateUnFollow(following._id);
        })
        .catch((err) => {
          // handle err
        });
    }
  }

  unFollowApi(id) {
    return this.http.delete(`${environment.URL_API}/friend/unfollow/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  updateUnFollow(id) {
    this.followings_id = this.followings_id.filter((follow) => {
      return follow._id != id;
    });

    this.followings = this.followings.filter((follow) => {
      return follow._id != id;
    });
  }

  public follow(user) {
    this.http
      .post(
        `${environment.URL_API}/friend/follow`,
        {
          user,
        },
        {
          headers: new HttpHeaders({ "access-token": getToken() }),
        }
      )
      .toPromise()
      .then((resp: any) => {
        this.getFollowings();
      })
      .catch((err) => {
        // handle error
      });
  }

  getFollowers() {
    this.http
      .get(`${environment.URL_API}/friend/followers`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .toPromise()
      .then((resp: any) => {
        this.followers_id = resp.ids;
        this.followers = resp.followers;
      })
      .catch((err) => {
        // handle err
      });
  }

  getFollowings() {
    this.http
      .get(`${environment.URL_API}/friend/followings`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .toPromise()
      .then((resp: FollowingsResponse) => {
        this.followings_id = resp.ids;
        this.followings = resp.followings;
      })
      .catch((err) => {
        // handle err
      });
  }

  getUsers() {
    return this.http.get(`${environment.URL_API}/user/users`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  goLanding() {
    window.location.replace("https://www.sportyeah.com");
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.chatService.clearChat();
    this.User = undefined;
    this.router.navigate(["/login"]);
  }

  update(body) {
    return this.http.put(`${environment.URL_API}/user/update`, body, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  async verifyToken(): Promise<Boolean> {
    return await new Promise((resolve, reject) => {
      if (this.User == undefined) {
        if (getToken() != null) {
          this.http
            .get(`${environment.URL_API}/user/user`, {
              headers: new HttpHeaders({ "access-token": getToken() }),
            })
            .subscribe(
               (resp: any) => {
                if(resp.user){
                  this.getFollowings();
                  this.getFollowers();
                  this.setUser(<User>resp.user);
                  this.socketService.socket.emit("login", { user: resp.user._id });
                  resolve(true);
                }else{
                  localStorage.clear();
                  reject(false);
                }
              },
              () => {
                localStorage.clear();
                reject(false);
              }
            );
        } else {
          reject(false);
        }
      } else {
        resolve(true);
      }
    });
  }

  sendMessage(body) {
    return this.http.post(`${environment.URL_API}/user/contactus`, body);
  }

  getUserByUsername(username) {
    return this.http.get(`${environment.URL_API}/user/username/${username}`);
  }

  getUserById(id) {
    return this.http.get(`${environment.URL_API}/user/id/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }


  public goToProfile(username,from = null,link = null) {
    if (username != this.User.username) {
      
      this.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
          .createProfileView(
            { user:resp.user._id,
             visitor:this.User._id,
             from:from,
             link: link!=null?`${link}`:link
           }
           )
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
    } else {
      this.router.navigate(["/profile"]);
    }
  }

  audio = new Howl({
    src: ["../../assets/sounds/done.mp3"],
  });

  public doneAudio() {
    this.audio.load();
    this.audio.play();
  }

  public changeSponsors(sponsors:ISponsor[]){
    this.http.post(
      `${environment.URL_API}/user/sponsors`,
      {id:this.User._id,sponsors},
      {headers: new HttpHeaders({ "access-token": getToken() })}
    );
  }
}
