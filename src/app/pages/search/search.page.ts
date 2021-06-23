import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { User } from "src/app/models/IUser";
import { Countrys } from "src/app/service/countrys.service";
import { profiles } from "src/config/base";
import { SocketService } from "../../service/socket.service";
import { UserService } from "../../service/user.service";
import { CountryFilterComponent } from "./country-filter/country-filter.component";
import { SportsFilterComponent } from "./sports-filter/sports-filter.component";


enum Texts {
  showFilters = "searchPage.showFilters",
  hideFilters = "searchPage.hideFilters",
  sports = "searchPage.sports",
  profile_user = "searchPage.profile_user",
  country = "searchPage.country",
  more = "searchPage.more",
  all = "searchPage.all",
  selectCountrys = "searchPage.selectCountrys",
  selectSports = "searchPage.selectSports",
  whatsapp = "searchPage.whatsapp",
  invWhatsapp = "searchPage.invWhatsapp"
}

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {

  public readonly Texts = Texts;
  type: string;
  query: string;
  users: User[] = [];
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService,
    private socialSharing: SocialSharing,
    private translate: TranslateService,
    private platform: Platform,
    private modalCtrl:ModalController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(["/dashboard"]);
    });
    this.route.queryParams.subscribe((data) => {
      this.handleQueryParams(data);
    });
  }

  handleQueryParams(data: Params) {
    if (["users"].includes(data?.type)) {
      this.type = data.type;
    } else {
      this.type = "users";
    }
    this.query = data?.query || "";

    this.filter(null);
  }


  profiles = []

  allProfiles = profiles

  ngOnInit() {}

  timeOut;

  filter(ev) {
    this.query = ev?.detail.value || "";

    this.usersSkip = 0;

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (this.type == "users") {
        this.usersQuery();
      }
    }, 300);
  }

  usersSkip = 0;
  allUsers = false;
  loading = false;

  newQuery(){
    this.usersSkip = 0;
    this.query = (this.query == "")?" ":this.query;
    this.usersQuery()
  }
  usersQuery() {
    this.users = [];
    if (this.query == "") {
      this.mostPopular();
    } else {
      this.loading = true;
      this.userService
        .queryUsersSkip(this.query, this.usersSkip,this.countrys,this.profiles,this.sports)
        .pipe(take(1))
        .subscribe(
          (users: User[]) => {
            this.loading = false;

            if (users.length < 15) {
              this.allUsers = true;
            } else {
              this.allUsers = false;
            }
            if (this.usersSkip > 0) {
              this.users = this.users.concat(users);
            } else {
              this.users = users;
            }
            this.usersSkip += 15;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  mostPopular() {
    this.loading = true;
    this.userService
      .mostPopulateUsers()
      .pipe(take(1))
      .subscribe(
        (users: User[]) => {
          this.loading = false;
          this.users = users;
        },
        () => {
          this.loading = false;
        }
      );
  }

  whatsapp() {
    let user = this.userService.User;
    this.socketService.socket.emit("shared", "whatsapp");
    this.socialSharing
      .shareViaWhatsApp(
        `${user.name} ${user.last_name} ${this.translate.instant(
          "invite_whatsapp"
        )}`,
        null,
        `https://app.sportyeah.com/signup?ref=${user.username}`
      )
      .then(() => {
        // intent
      })
      .catch(() => {
        window.open(
          `https://wa.me/?text=${user.name} ${
            user.last_name
          } ${this.translate.instant(
            "invite_whatsapp"
          )} https://app.sportyeah.com/user/${user.username}`,
          "_blank"
        );
      });
  }

  showFilters = false


  countrys:Countrys[] = []
  sports:string[] = []

  async selectCountrys(){
      const modal = await this.modalCtrl.create({
        component:CountryFilterComponent,
        componentProps:{countrys:this.countrys},
        cssClass:"modal-border"
      })

      modal.onDidDismiss().then((response)=>{
       this.countrys = response.data?response.data:this.countrys;
       this.newQuery()
      })
      return await modal.present()
  }
  async selectSports(){
      const modal = await this.modalCtrl.create({
        component:SportsFilterComponent,
        componentProps:{sports:this.sports},
        cssClass:"modal-border"
      })

      modal.onDidDismiss().then((response)=>{
       this.sports = response.data?response.data:this.sports;
       this.newQuery()
      })
      return await modal.present()
  }
}
