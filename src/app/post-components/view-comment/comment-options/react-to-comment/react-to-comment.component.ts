import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { IComment, ILike } from "src/app/models/iPost";
import { LikesPostComponent } from "src/app/post-components/likes-post/likes-post.component";
import { CommentService } from "src/app/service/comment.service";
import { UserService } from "src/app/service/user.service";
@Component({
  selector: "react-to-comment",
  templateUrl: "./react-to-comment.component.html",
  styleUrls: ["./react-to-comment.component.scss"],
})
export class ReactToCommentComponent implements OnInit {
  @Input() comment: IComment;
  @ViewChild("reacts") reacts: ElementRef;
  @ViewChild("overlay") overlay: ElementRef;

  constructor(
    public userService: UserService,
    private commentService: CommentService,
    private modalController: ModalController,
    public translate: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getCountReacions();
    window.addEventListener("click", () => {
      this.Close();
    });
  }

  /**
   * Cantidad de reacciones en el post
   */
  countReacions = 0;

  /**
   * Obtener la cantidad de reacciones en el post
   */
  getCountReacions() {
    this.commentService
      .countReactionsByComment(this.comment._id)
      .pipe(take(1))
      .subscribe((reactions) => {
        this.countReacions = reactions;
        this.IReacted();
      });
  }

  /**
   * Saber si el usuario acual, reacciono al post
   */
  async IReacted() {
    if (this.countReacions < 1) {
      this.reaction = null;
    } else {
      try {
        let reaction: any = await this.commentService
          .userReactToComment(this.comment._id, this.userService.User?._id)
          .toPromise();

        this.reaction = reaction ? reaction : false;
      } catch (error) {
        this.reaction = null;
      }
    }
  }

  reactions = [
    {
      option: 1,
      url: "assets/images/like.png",
      name: "post.like",
      style: {
        color: "#1877F2",
      },
    },
    {
      option: 2,
      url: "assets/images/crush.png",
      name: "post.crush",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 3,
      url: "assets/images/haha.png",
      name: "post.haha",
      style: {
        color: "#f0b125",
      },
    },
    {
      option: 4,
      url: "assets/images/wow.png",
      name: "post.wow",
      style: {
        color: "#f0b125",
      },
    },
    {
      option: 5,
      url: "assets/images/sad.png",
      name: "post.sad",
      style: {
        color: "#f0b125",
      },
    },
    {
      option: 6,
      url: "assets/images/angry.png",
      name: "post.angry",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 7,
      url: "assets/images/level2.png",
      name: "post.level2",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 8,
      url: "assets/images/level3.png",
      name: "post.level3",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 9,
      url: "assets/images/legion.png",
      name: "post.legion",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 10,
      url: "assets/images/lol.png",
      name: "post.lol",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 11,
      url: "assets/images/me_sirve.png",
      name: "post.me_sirve",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 12,
      url: "assets/images/bro.png",
      name: "post.bro",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 13,
      url: "assets/images/fachero.png",
      name: "post.fachero",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 14,
      url: "assets/images/ban.png",
      name: "post.ban",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 15,
      url: "assets/images/troll.png",
      name: "post.troll",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 16,
      url: "assets/images/chill.png",
      name: "post.chill",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 17,
      url: "assets/images/cringe.png",
      name: "post.cringe",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 18,
      url: "assets/images/admin.png",
      name: "post.admin",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 19,
      url: "assets/images/hype.png",
      name: "post.hype",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 20,
      url: "assets/images/random.png",
      name: "post.random",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 21,
      url: "assets/images/meh.png",
      name: "post.meh",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 22,
      url: "assets/images/wtf.png",
      name: "post.wtf",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 23,
      url: "assets/images/idk.png",
      name: "post.idk",
      style: {
        color: "#e9651e",
      },
    },
    {
      option: 24,
      url: "assets/images/omg.png",
      name: "post.omg",
      style: {
        color: "#e9651e",
      },
    },
  ];

  time: boolean = false;
  timeOut: any = null;
  timeOutClose: any = null;
  reactionoff() {
    if (this.reacts.nativeElement.classList.contains("show")) {
    }
  }
  reactionon(e) {
    e.stopPropagation();
    if (!this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.classList.add("show");
      this.overlay.nativeElement.classList.add("show");
    } else {
      this.reacts.nativeElement.classList.remove("show");
      this.overlay.nativeElement.classList.remove("show");
    }
  }
  reactionsON() {
    clearTimeout(this.timeOutClose);
    this.timeOut = setTimeout(() => {
      this.reactionon(null);
    }, 600);
  }

  Close() {
    if (this.reacts.nativeElement.classList.contains("show")) {
      this.reacts.nativeElement.classList.remove("show");
    }
    this.overlay.nativeElement.classList.remove("show");
  }

  changefalse() {
    this.timeOutClose = setTimeout(() => this.reactionoff(), 600);
    clearTimeout(this.timeOut);
  }

  /**
   * La reaccion actual del usuario
   */
  reaction: ILike = null;

  /**
   * Si el usuario ha reaccionado, que se deshabilita el boton para evitar que reaccione dos veces o ocacione retraos innecesarios
   */
  loading = false;

  /**
   * Reaccionar a una publicacion
   * @param id _id del post
   * @param reaction tipo de reaccion
   * @param only si presiono el boton en vez de alguna reaccion
   */
  react(reaction, only = false) {
    // empieza el loading y bloquea el boton para que no pueda interactuar denuevo mientras se hace la logica
    this.loading = true;
    // se cierra las reacciones
    this.Close();
    // obtenemos la reaccion actual
    let liked = this.reaction;

    // si hay reaccion y presiono el boton entonces se elimina la reaccion
    if (liked && only) {
      this.dislike();
    } else if (!liked) {
      // si no hay reaccion, entonces se reacciona
      this.like(reaction);
    } else {
      // si ya hay reaccion, y presiono una reaccion entonces se actualiza a la que presiono
      this.changeReaction(liked._id, reaction);
    }
  }

  /**
   * Cambiar una reaccion
   * @param id _id de la reaccion
   * @param type tipo de reaccion
   */
  changeReaction(id, type) {
    this.commentService
      .changeReact(id, type)
      .pipe(take(1))
      .subscribe(
        (data: any) => {
          // si todo salio bien, actualizamos las reaccionesS
          this.uptadeReactions(data.like, data.likes);
        },
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Reacciona a un comentario
   * @param comment _id del comentario
   * @param reaction tipo de reaccion
   */
  like(reaction) {
    this.commentService
      .likeComment(this.comment._id, reaction)
      .pipe(take(1))
      .subscribe(
        (resp: { like: ILike; likes: number }) => {
          // si todo salio bien actualizamos las reacciones
          this.uptadeReactions(resp.like, resp.likes);
        },
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Quitar la reaccion de una publicacion
   * @param like _id de la reaccion
   */
  dislike() {
    // le decimos al backend que marque la reaccion como eliminada
    this.commentService
      .dislikeComment(this.reaction._id)
      .pipe(take(1))
      .subscribe(
        (likes: number) => {
          // si todo salio bien, actualizamos las reacciones
          this.uptadeReactions(null, likes);
        },
        () => {
          // si falla, ponemos que ya no esta cargando para desbloquear el boton
          this.loading = false;
        }
      );
  }

  /**
   * Actualiza las reacciones
   * @param reaction cuerpo de la reaccion o null
   * @param likes cantidad de reacciones a este post
   */
  uptadeReactions(reaction, likes) {
    // actualizamos el cuerpo de la reaccion
    this.reaction = reaction;
    // actualizamos la cantidad de likes
    this.countReacions = likes;
    // marcamos que ya no esta cargando
    this.loading = false;
  }

  modalOpen = false;

  async seeLikes() {
    if (!this.modalOpen) {
      this.modalOpen = true;

      let modal = await this.modalController.create({
        component: LikesPostComponent,
        componentProps: {
          comment: this.comment._id,
        },
      });
      modal.onDidDismiss().then(() => {
        this.modalOpen = false;
      });

      return modal.present();
    }
  }
}
