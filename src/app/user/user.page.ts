import { Component, OnInit } from "@angular/core";
import { LandingService } from "src/app/service/landingService";
import { ActivatedRoute, Router } from "@angular/router";
import { IPostC } from "../models/iPost";
import { PostService } from "../service/post.service";
import { User, UserService } from "../service/user.service";
import { ChatService } from "../service/chat.service";
import { LoginService } from "./../service/login.service";
import { ViewsProfileService } from "../service/views-profile.service";
import { AngularDelegate } from "@ionic/angular";
import { take } from "rxjs/operators";
interface UserData {
  user: User;
  friends: {
    followers: number;
    followings: number;
  };
  posts: number;
  connected: boolean;
}
@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"],
})
export class UserPage implements OnInit {
  /**
   * Usuario que estamos visitando
   */
  public profile: boolean = true;
  public postsB: boolean = false;
  public loadingInit: boolean = true;
  user: any = null;
  friends: any = null;
  postsCount = 0;
  posts: IPostC[] = [];
  lastConection: Date;
  connected: boolean = null;
  landingButton: boolean = false;
  landingNotActive: boolean = false;
  public banderaIP: string = null;
  public ipLoaded: Promise<boolean>;
  estado: any;
  // variable de control para el rango de posts
  skip = 0;
  loadingPost: any = false;

  id_visited: string;
  slider: any; //Para el carrousel
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private chatService: ChatService,
    public loginService: LoginService,
    private viewsProfileService: ViewsProfileService,
    private ls: LandingService,
  ) {
  }

  ionViewWillEnter() {
    this.ls.getByUser(this.route.snapshot.paramMap.get("username"))
      .pipe(take(1))
      .subscribe((r:any)=>{
        if(r !== null && localStorage.getItem('landing') !== 'false'){
          if(r.active === true)  
            this.router.navigate(['../../landing/'+this.route.snapshot.paramMap.get("username")])
          else{
            this.landingNotActive = true;
            this.loadingInit = false;
          }
        }else{
            this.loadingInit = false;
        }
        localStorage.setItem('landing','true');
      });
    // Cuando Inicia busca el username que viene en los parametros
    this.userService
      .getUserByUsername(this.route.snapshot.paramMap.get("username"))
      .pipe(take(1))
      .subscribe(
        (resp: UserData) => {
          // Si existe el usuario este destribuira la data

          // friends son la cantidad de seguidores y siguiendo
          this.friends = resp.friends;
          // El objeto del usuario
          this.user = resp.user;
          // La cantidad de post que ha hecho este usuario
          this.postsCount = resp.posts;
          // Obtenemos sus post
          this.getPosts(resp.user._id);
          // Vemos si esta conectado
          this.connected = resp.user.connected;
          // Obtenemos su ultima desconexion
          this.lastConection = resp.user.lastConection;
          // Obtenemos su estado
          this.estado = resp.user.estado;

          //Llamamos a la getviews
          // this.visited = resp.user._id

          this.id_visited = resp.user._id;
          this.slider = resp.user.slider;
          
          const uP = resp.user.profile_user;
          if(
            uP === 'club' ||
            uP === 'representative' ||
            uP === 'association' ||
            uP === 'foundation' ||
            uP === 'federation' ||
            uP === 'brand' ||
            uP === 'sponsor' 
          )
            this.landingButton = true;
          else this.landingButton = false;

          /* this.viewsProfileService
            .updateProfileView(this.userService.User._id, resp.user._id,'direct',null)
            .subscribe((response) => {
              console.log(response);
            }); */
        },
        (err) => {
          // si hubo un error, lo mas probable es que sea porque el usuario no existe
          // por lo tanto lo marcamos como not found
          this.user = 404;
        }
      )
  }

  /**
   * Buscar las publicaciones de un usuario
   *
   * @param id `_id` del usuario
   * @param event Por defecto `null` Pero se utiliza para el evento de recargar con el refresh de android y Ios
   * @param reload Para traer los nuevos post, por defecto es `false` para que busque viejos post con los eventos del scroll
   */
  getPosts(id: string, event = null, reload = false) {
    this.loadingPost = true;

    // Si reload se pasa como `true` entonces seteamos `skip` = `0` y vaciamos el array de `posts`
    if (reload) {
      this.skip = 0;
      this.posts = [];
    }
    this.postService
      .postByUser(id, this.skip)
      .toPromise()
      .then((posts: IPostC[]) => {
        this.posts = this.posts.concat(posts);
        if (event) {
          event.target.complete();
        }
        this.skip += 10;
        this.loadingPost = false;
      });
  }

  //Contendra el _id del viewProfile al que se visita
  visited: any;
  vistasPerfil: any;
  ngOnInit() {
    this.loginService.getIP().subscribe((geo) => {
      this.banderaIP = geo.country;
      this.ipLoaded = Promise.resolve(true);
    });
  }

  goTo(r) {
    this.router.navigate([`/user/${this.user.username}/${r}`]);
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  createChat(user) {
    this.chatService
      .create(user._id)
      .toPromise()
      .then((resp) => {
        this.router.navigate(["/chat"], { state: { chat: resp } });
      })
      .catch((err) => {
        // handle
      });
  }

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingPost
    ) {
      this.getPosts(this.user._id);
    }
  }

  segmentChanged(e: CustomEvent) {
    if(e.detail.value === 'posts'){
      this.profile = false;
      this.postsB = true;
    }else{
      this.postsB = false;
      this.profile = true; 
    }
  }

}
