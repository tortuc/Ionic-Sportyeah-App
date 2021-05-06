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
import { LoginService } from "./login.service";
import { Followers, Followings, User } from "../models/IUser";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Subject } from "rxjs";

// import { FcmService } from "./fcm.service";

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
    private viewsProfileService:ViewsProfileService,
    private loginService: LoginService,
    private translate: TranslateService,
    // private fcmService: FcmService,
    private cookieService: CookieService
  ) {}


  /**
   * Cuerpo principal del usuario
   */
   public User: User = null;

   /**
    * Seguidores del usuario
    */
   public followers: Followers[] = [];
 
   /**
    * Usuarios que sigo
    */
   public followings: Followings[] = [];

  /**
   * Setea al usuario
   * @param user
   */
   setUser(user: User) {
    this.translate.use(user.lang);
    this.cookieService.set("lang", user.lang);
    this.User = user;
    this.wishService.getList(user._id);
  }

  getUser() {
    return this.User;
  }


  
  
  /**
   * Retorna si esta siguiendo a un usuario
   * @param id _id del usuario
   * @returns
   */

   public isFollow(id) {
    let following = this.followings.find((following: any) => {
      return following.user._id == id;
    });
    return following ? true : false;
  }

  public unFollow(user) {
    let following = this.followings.find((following: any) => {
      return following.user._id == user;
    });

    if (following) {
      return this.unFollowApi(following._id)
        .toPromise()
        .then((folow) => {
          this.updateUnFollow(following._id);
          return true;
        })
        .catch(() => {
          throw false;
        });
    } else {
      return false;
    }
  }

  
  unFollowApi(id) {
    return this.http.delete(`${environment.URL_API}/friend/unfollow/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Saca al usuario que acaba de dejar de seguir, del array de los usuarios seguidos
   */
  updateUnFollow(id) {
    this.followings = this.followings.filter((follow) => {
      return follow._id != id;
    });
  }

  public follow(user, username = null) {
    if (!this.User && username != null) {
      this.loginService.goToLogin(`/user/${username}`);
      return false;
    } else {
      return this.http
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
        .then((follow: any) => {
          this.followings.push({ _id: follow._id, user: follow.user });
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }

  getFollowers() {
    this.http
      .get(`${environment.URL_API}/friend/followers`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .toPromise()
      .then((resp: Followers[]) => {
        this.followers = resp.sort((a, b) => {
          return a.follower.name > b.follower.name ? 1 : -1;
        });
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
      .then((resp: any) => {
        this.followings = resp;
      })
      .catch((err) => {
        // handle err
      });
  }

  users: User[] = null;


  getUsers() {
    return this.http.get(`${environment.URL_API}/user/users`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  goLanding() {
    window.location.replace("https://www.sportyeah.com");
  }
  logout() {
    this.User = null;
    this.chatService.clearChat();
    localStorage.clear();
    sessionStorage.clear();
    this.logout$.next(true);
    this.router.navigate(["/login"]);
  }

  update(body) {
    return this.http.put(`${environment.URL_API}/user/update`, body, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  async verifyToken(): Promise<Boolean> {
    return await new Promise((resolve, reject) => {
      if (this.User == null) {
        if (getToken() != null) {
          this.http
            .get(`${environment.URL_API}/user/user`, {
              headers: new HttpHeaders({ "access-token": getToken() }),
            })
            .subscribe(
              (resp: any) => {
                if (resp.user != null) {
                  this.setUser(<User>resp.user);
                  // this.fcmService.saveTokenUser(resp.user._id);
                  this.getFollowings();
                  this.getFollowers();

                  this.socketService.socket.emit("login", {
                    user: resp.user._id,
                  });
                  resolve(true);
                } else {
                  localStorage.clear();
                  reject(false);
                }
              },
              (err) => {
              

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


  public goToProfile(username,idUser,from,link) {
    console.log(username,idUser,from,link);
    
    if (username != this.User.username) {
      // this.getUserByUsername(username)
      // .subscribe(
        // (resp:any)=>{
          this.viewsProfileService 
          .createProfileView(
            { user:idUser,
             visitor:this.User._id,
             from:from,
             link: link!=undefined?`${link}`:link
           }
           )
            .subscribe(() => {
              this.router.navigate([`/user/${username}`])
            });
        // }
      // )
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

  private logout$ = new Subject<boolean>();

  logoutObservable() {
    return this.logout$.asObservable();
  }


  mostPopulateUsers() {
    return this.http.get(`${environment.URL_API}/user/fivepopular`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  queryUsers(query) {
    return this.http.get(`${environment.URL_API}/friend/query/${query}`);
  }
  queryUsersSkip(query, skip) {
    return this.http.get(
      `${environment.URL_API}/friend/query/${query}/${skip}`
    );
  }

  getUserById(id) {
    return this.http.get(`${environment.URL_API}/user/id/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

}
