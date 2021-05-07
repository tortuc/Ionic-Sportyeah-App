import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChatService } from './chat.service';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private translate: TranslateService,
    private router: Router,
    private http:HttpClient
  ) { }


  /**
   * Si hay una invitacion al grupo, lo metemos en el
   */
   async groupInvited() {
    if (this.cookieService.check("join_group")) {
      let chat = JSON.parse(this.cookieService.get("join_group"));

      let inChat = await this.verifyUserInChat(chat.group,this.userService.User?._id).toPromise()
      console.log("si o no ",inChat);
      
      if(!inChat){
        let pending = chat.privacy == "public" ? false : true;
        // agregamos al usuario al grupo directamente o a los pendientes
        this.chatService
          .addusers(chat.group, [this.userService.User._id], pending)
          .pipe(take(1))
          .subscribe(
            () => {
              // si se agrego mostramos el mensaje correspondiente a si es publico o privado
              let msg = this.translate.instant(
                `join_group.${chat.privacy}`,
                chat
              );
              this.toastService.presentToast(msg);
              // lo redirigimos al chat si entro al grupo, o al dashboard si el grupo es privado
              let route = chat.privacy == "public" ? "/chat" : "/dashboard";
              this.cookieService.delete("join_group");
              this.nagivateTo(route);
            },
            () => {
              // si ocurrio un error, le mostramos al usuario un mensaje que algo ha salido mal
              this.toastService.presentToast(
                this.translate.instant("join_group.err")
              );
            }
          );
      }else{
        this.cookieService.delete("join_group");

        sessionStorage.setItem("chat", chat.group);
        this.router.navigate(["/chat"]);
      }
     
    }
  }

  /**
   * Navegar a un ruta en especifico
   * @param route ruta a dirigirse
   */
  nagivateTo(route) {
    this.router.navigate([route], {
      preserveFragment: false,
      replaceUrl: true,
    });
  }

  verifyUserInChat(chat,user){
    return this.http.get(`${environment.URL_API}/chat/verify/inchat/${chat}/${user}`)
  }
}
