import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { OpenImgComponent } from "src/app/components/open-img/open-img.component";
import { LandingService } from "src/app/service/landingService";
import { ActivatedRoute, Router } from "@angular/router";
import { IPost, IPostC } from "../models/iPost";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { ChatService } from "../service/chat.service";
import { LoginService } from "./../service/login.service";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { NewsService } from "../service/news.service";
import { User } from "../models/IUser";

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
  @ViewChild("reloadButton", { static: false }) reloadButton: any;

  /**
   * Usuario que estamos visitando
   */
  public profile: boolean = true;
  public postsB: boolean = false;
  public newsB: boolean = false;
  public loadingInit: boolean = true;
  user: any = null;
  friends: any = null;
  postsCount = 0;
  posts: IPost[] = [];
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
    public mc: ModalController,
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private chatService: ChatService,
    public loginService: LoginService,
    private cd: ChangeDetectorRef,
    private ls: LandingService,
    public newsService: NewsService
  ) {}

  ionViewWillEnter() {
    this.ls
      .getByUser(this.route.snapshot.paramMap.get("username"))
      .pipe(take(1))
      .subscribe((r: any) => {
        if (r !== null && localStorage.getItem("landing") !== "false") {
          if (r.active === true)
            this.router.navigate([
              "../../landing/" + this.route.snapshot.paramMap.get("username"),
            ]);
          else {
            this.landingNotActive = true;
            this.loadingInit = false;
          }
        } else {
          this.loadingInit = false;
        }
        localStorage.setItem("landing", "true");
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

          // Si es prensa obtenemos sus articulos
          if (resp.user.profile_user == "press") {
            this.getArticle(resp.user._id);
          }

          //Llamamos a la getviews
          // this.visited = resp.user._id

          this.id_visited = resp.user._id;
          this.slider = resp.user.slider;

          const uP = resp.user.profile_user;
          if (
            uP === "club" ||
            uP === "representative" ||
            uP === "association" ||
            uP === "foundation" ||
            uP === "federation" ||
            uP === "brand" ||
            uP === "sponsor"
          )
            this.landingButton = true;
          else this.landingButton = false;
        },
        (err) => {
          // si hubo un error, lo mas probable es que sea porque el usuario no existe
          // por lo tanto lo marcamos como not found
          this.user = 404;
        }
      );
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
      .then(
        (posts: IPost[]) => {
          this.posts = this.posts.concat(posts);
          if (event) {
            event.target.complete();
          }
          this.skip += 10;
          this.loadingPost = false;
        },
        (err) => {
          // QUIERE DECIR QUE NO HAY POST
        }
      );
  }

  news = [];
  getArticle(id) {
    this.newsService.findUserNews(id).subscribe((response: any) => {
      this.news = response.filter((news) => {
        return news.stream == false;
      });
    });
  }

  OpenNews(id) {
    this.router.navigate([`news/read/${id}`]);
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
    this.cd.detectChanges();
    if (el.clientHeight * 0.4 < el.scrollTop) {
      setTimeout(() => {
        this.reloadButton?.el.classList.add(
          "floating-reload",
          "scale-in-center",
          "btn-green"
        );
      }, 100);
    } else {
      this.reloadButton?.el.classList.remove(
        "scale-in-center",
        "floating-reload",
        "btn-green"
      );
    }

    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingPost
    ) {
      this.getPosts(this.user._id);
    }
  }
  segmentChanged(e: CustomEvent) {
    if (e.detail.value === "posts") {
      this.profile = false;
      this.newsB = false;
      this.postsB = true;
    } else if (e.detail.value === "profile") {
      this.postsB = false;
      this.newsB = false;
      this.profile = true;
    } else {
      this.newsB = true;
      this.postsB = false;
      this.profile = false;
    }
  }

  async open(img: string) {
    const modal = await this.mc.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser: this.route.snapshot.params.username,
        delete: false,
      },
    });
    modal.present();
  }
}
