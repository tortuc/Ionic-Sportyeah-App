import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { getToken } from "../helpers/token";
import { IChat, IChatList } from "../models/IChat";
import { Howl } from "howler";
import { SocketService } from "./socket.service";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  route: string = `${environment.URL_API}/chat`;

  public chatActived = false;

  public loading = false;
  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private cookieService: CookieService
  ) {
    try {
      this.socketService.socket.on("msg", (data) => {
        if (
          !this.cookieService.check("chat") ||
          data.msg.chat != this.cookieService.get("chat")
        ) {
          this.playAudio();
        }else{
          this.playDropsound()
        }
        this.getMyChats();
      });
    } catch (err) {}
  }

  audio2 = new Howl({
    src: ["assets/sounds/drop.mp3"],
    volume: 0.5
  });

  /**
   * Reproduce un audio tipo gota
   */
  playDropsound() {
    this.audio2.load();
    this.audio2.play();
  }

  audio = new Howl({
    src: ["assets/sounds/sound1.mp3"],
  });

  playAudio() {
    this.audio.load();
    this.audio.play();
  }

  public allUnread = 0;

  public chats: IChatList[] = [];
  public groups: IChatList[] = [];

  create(user) {
    return this.http.post(
      `${this.route}/create`,
      { user },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  createGroup(group) {
    return this.http.post(
      `${this.route}/create/group`,
      { group },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  clearChat() {
    this.chats = [];
  }

  getMyChats() {
    this.loading = true;
    this.http
      .get(`${this.route}/user`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .toPromise()
      .then((chats: IChatList[]) => {
        this.chats = chats;
        this.allUnread = 0;
        this.loading = false;
        this.chats.forEach((chat) => {
          this.allUnread += chat.unreads;
        });
      })
      .catch((err) => {
        this.loading = false;
        // handle err
      });
  }

  getPublicGroups(query = "") {
    this.http
      .get(`${this.route}/public/groups/${query}`, {
        headers: new HttpHeaders({ "access-token": getToken() }),
      })
      .toPromise()
      .then((groups: IChat[]) => {
        this.groups = groups.map((g) => {
          return {
            chat: g,
            lastMessage: null,
            unreads: null,
          };
        });
      })
      .catch((err) => {
        // handle err
      });
  }

  reads(idChat) {
    this.chats.map((chat) => {
      if (chat.chat._id == idChat) {
        this.allUnread -= chat.unreads;
        return (chat.unreads = 0);
      } else {
        return chat;
      }
    });
  }

  public logout() {
    this.chats = [];
    this.allUnread = 0;
  }

  /**
   * Dejar un chat grupal
   * @param id
   */

  leaveChat(id) {
    return this.http.delete(`${this.route}/leave/${id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * Obtener chat por su id
   * @param id
   */

  getChatById(id) {
    return this.http.get(`${this.route}/get/${id}`);
  }
  /**
   * Edita un chat grupal
   * @param id
   * @param data
   */

  editChat(id, data) {
    return this.http.put(
      `${this.route}/edit/${id}`,
      { data },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }
  /**
   * Agregar usuarios a un chat grupal
   * @param id
   * @param users
   * @param pending `true` si el el usuario necesita ser aprobado, `false` si ingresa directo al grupo
   */

  addusers(id, users, pending = false) {
    return this.http.put(
      `${this.route}/addusers/${id}`,
      { users, pending },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  /**
   * Agregar usuarios a un chat grupal
   * @param id
   * @param user
   */

  kickUSer(id, user) {
    return this.http.delete(`${this.route}/kickuser/${id}/${user}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }

  /**
   * hacer a un usuario administrador del grupo
   * @param id
   * @param user
   */

  makeAdmin(id, user) {
    return this.http.put(
      `${this.route}/makeadmin/${id}`,
      { user },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  /**
   * descardat a un usaurio como admin del grupo
   * @param id
   * @param user
   */

  discardAdmin(id, user) {
    return this.http.put(
      `${this.route}/discardadmin/${id}`,
      { user },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }

  private chatEdit$ = new Subject<IChat>();

  editedChat(chat: IChat) {
    this.getMyChats();
    this.chatEdit$.next(chat);
  }

  editedChatObservable() {
    return this.chatEdit$.asObservable();
  }

  private closeChat$ = new Subject<void>();

  closeChat() {
    this.getMyChats();
    this.cookieService.delete("chat");
    this.closeChat$.next();
  }

  closeChatObservable() {
    return this.closeChat$.asObservable();
  }

  /**
   * Verificar si un usuario es admin de un grupo
   * @param chat_id
   */
  verifyIfUserIsAdminOfGroup(chat_id) {
    return this.http.get(`${this.route}/verify/ifIsAdmin/${chat_id}`, {
      headers: new HttpHeaders({ "access-token": getToken() }),
    });
  }
  /**
   * Manejar peticiones de usuarios a grupos privados
   * @param chat
   * @param user
   * @param action
   */
  handleGroupJoinRequest(chat, user, action) {
    return this.http.post(
      `${this.route}/handle/group-join-request/${chat._id}/${action}`,
      { user },
      {
        headers: new HttpHeaders({ "access-token": getToken() }),
      }
    );
  }
}
