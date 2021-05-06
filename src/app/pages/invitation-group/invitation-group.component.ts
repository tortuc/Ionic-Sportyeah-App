import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from "../../service/chat.service";
import { IChat } from "../../models/IChat";
import { UserService } from "../../service/user.service";
import { ToastService } from "../../service/toast.service";
import { CookieService } from "ngx-cookie-service";
import { take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-invitation-group",
  templateUrl: "./invitation-group.component.html",
  styleUrls: ["./invitation-group.component.scss"],
})
export class InvitationGroupComponent implements OnInit {
  inside: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    public userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private loadingCtrl:LoadingController
  ) {}

  chat: IChat;

  async ngOnInit() {
    let loading = await this.loadingCtrl.create({
      message:this.translate.instant("loading")
    })
    loading.present()
    //  Obtenemos el grupo
    this.chatService
      .getChatById(this.route.snapshot.paramMap.get("id"))
      .toPromise()
      .then((chat: IChat) => {
        loading.dismiss()
        console.log(chat);
        
        
        this.chat = chat;
        
        if(this.userService.User){
          let inside = chat.users.find(x=>x._id == this.userService.User._id)
          this.inside = (inside)?true:false;
        }
      })
      .catch((e) => {
        loading.dismiss()
        this.router.navigate(["/"])
        // Handle catch
      });
  }

  join() {
    // Verificamos si el usuario esta ya logeado

    if (this.userService.User != undefined) {
      // si la privacidad del grupo es publica, entonces el usuario entrara directo al grupo, si es privada, entrara en los pendientes por aceptar aprobacion
      let pending = this.chat.group_privacy == "public" ? false : true;
      // agregamos al usuario al grupo directamente o a los pendientes
      this.chatService
        .addusers(this.chat._id, [this.userService.User._id], pending)
        .pipe(take(1))
        .subscribe(
          () => {
            // si se agrego mostramos el mensaje correspondiente a si es publico o privado
            let msg = this.translate.instant(
              `join_group.${this.chat.group_privacy}`,
              this.chat
            );
            this.showMsg(msg);
            // lo redirigimos al chat si entro al grupo, o al dashboard si el grupo es privado
            let route =
              this.chat.group_privacy == "public" ? "/chat" : "/dashboard";
            this.nagivateTo(route);
          },
          () => {
            // si ocurrio un error, le mostramos al usuario un mensaje que algo ha salido mal
            this.showMsg(this.translate.instant("join_group.err"));
          }
        );
    } else {
      // si el usuario no esta logueado, entonces metemos en una cookie la informacion del grupo, por si se registra, o inicia sesion poder meterlo al grupo luego
      this.cookieService.set(
        "join_group",
        JSON.stringify({
          group: this.chat._id,
          privacy: this.chat.group_privacy,
          name:this.chat.name
        }),
        1
      );
      this.nagivateTo("/login");
    }
  }

  /**
   * Muestra un mensaje (toast) al usuario
   * @param msg mensaje a mostrar
   */
  showMsg(msg) {
    this.toastService.presentToast(msg);
  }

  nagivateTo(route) {
    this.router.navigate([route]);
  }
}
