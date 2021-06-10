import { Component, Input, OnInit } from "@angular/core";
import { AlertController, LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-see-all-users-landing",
  templateUrl: "./see-all-users-landing.component.html",
  styleUrls: ["./see-all-users-landing.component.scss"],
})
export class SeeAllUsersLandingComponent implements OnInit {
  @Input() users: User[];
  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController
  ) {}

  allUsers: User[];
  allUsersBlock: User[];
  segment = "users";

  ngOnInit() {
    this.allUsers = this.users;
    this.filter();
    
    
  }

  filter(query = '') {
    /// Esta funcion se llama cada vez que el usuario escribe algo en el buscador
    // renderiza a los usuarios que coinciden en el match de lo que el usuario escribio en el buscador
    this.users = this.allUsers.filter((user) => {
      query = query.replace(" ", "").toLowerCase();

      let find = user.name + user.last_name + user.username;
      find = find.replace(" ", "").toLowerCase();
      return find.includes(query);
    });


  }

  dismiss() {
    this.modalCtrl.dismiss({
      action: "dismiss",
    });
  }

  // Pregunta si quieres expulsar al usuario

  async delete(user) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("landing_event.seeAll.out.header"),
      message: this.translate.instant("landing_event.seeAll.out.message"),
      buttons: [
        { text: this.translate.instant("cancel"), role: "cancel" },
        {
          text: this.translate.instant("agree"),
          handler: () => {
            this.deleteUser(user);
          },
        },
      ],
    });
    alert.present();
  }

  // Expulsa a un usuario del evento
  deleteUser(user: User) {
    // this.landingService
    //   .removeUser(this.event._id, user)
    //   .toPromise()
    //   .then(() => {
    //     this.users = this.users.filter((userF) => {
    //       return userF._id != user._id;
    //     });
    //     this.allUsers = this.users;
    //     this.filter();
    //   })
    //   .catch((err) => {
    //     // handle
    //   });
  }
// Pregunta si quieres bloquear a un usuario
  async block(user: User) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("landing_event.seeAll.block.header"),
      message: this.translate.instant("landing_event.seeAll.block.message"),
      buttons: [
        { text: this.translate.instant("cancel"), role: "cancel" },
        {
          text: this.translate.instant("agree"),
          handler: () => {
            this.blockUser(user)
          },
        },
      ],
    });
    alert.present();
  }

  // Bloquea a un usuario

  blockUser(user:User){
    // this.landingService
    // .blockUser(this.event._id, user._id)
    // .toPromise()
    // .then(() => {
    //   this.blockeds.push(user);
    //   this.users = this.users.filter((val) => {
    //     return val._id != user._id;
    //   });
    //   this.allUsers = this.users;
    //   this.allUsersBlock = this.blockeds;
    // });
  }

  // Pregunta al usuario si quiere desbloquear al otro usuario

  async unlock(user: User) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("landing_event.seeAll.unlock.header"),
      message: this.translate.instant("landing_event.seeAll.unlock.message"),
      buttons: [
        { text: this.translate.instant("cancel"), role: "cancel" },
        {
          text: this.translate.instant("agree"),
          handler: () => {
          this.unlockUser(user)
          },
        },
      ],
    });
    alert.present();
  }

  // Desbloquea a un usuario para que pueda ver el evento

  unlockUser(user:User){
    // this.landingService
    // .unlockUser(this.event._id, user._id)
    // .toPromise()
    // .then(() => {
    //   this.users.push(user);
    //   this.blockeds = this.blockeds.filter((val) => {
    //     return val._id != user._id;
    //   });
    //   this.allUsers = this.users;
    //   this.allUsersBlock = this.blockeds;
    // });
  }

  async remind(){
    let loading = await this.loadingCtrl.create({
      message:this.translate.instant('loading')
    })
    loading.present()
    // this.landingService.remindUsers(this.event._id).toPromise()
    // .then(async ()=>{
    //   let alert = await this.alertCtrl.create({
    //     header:this.translate.instant('landing_event.seeAll.remind.header'),
    //     message:this.translate.instant('landing_event.seeAll.remind.message'),
    //     buttons:[{text:this.translate.instant('okey')}]
    //   })
    //   alert.present()
    //   loading.dismiss()
    // })
    // .catch(()=>{
    //   loading.dismiss()
    // })
  }
}
