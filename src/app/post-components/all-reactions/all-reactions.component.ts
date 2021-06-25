import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { take } from "rxjs/operators";
import { ILike } from "src/app/models/iPost";
import { ReactionsService } from "src/app/service/reactions.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "all-reactions",
  templateUrl: "./all-reactions.component.html",
  styleUrls: ["./all-reactions.component.scss"],
})
export class AllReactionsComponent implements OnInit {
  /**
   * _id De la publicacion
   */
  @Input() post: string;
  /**
   * _id Del comentario
   */
  @Input() comment: string;

  /**
   * Se dio click a un usuario
   */
  @Output() visit = new EventEmitter();

  /**
   * Paginanacion
   */
  skip = 0;
  /**
   * Reacciones
   */
  reactions: ILike[] = [];

  constructor(
    private reactionsService: ReactionsService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getReactions();
  }

  /**
   * Si el usuario hizo scroll, buscar mas reacciones
   */
  scroll() {
    if (!this.loading) {
      this.getReactions();
    }
  }

  /**
   * loading
   */
  loading = false;

  /**
   * Obtiene las reacciones de cualquier tipo, de 15 en 15
   */
  getReactions() {
    this.loading = true;
    if(this.post){
      this.reactionsService
      .anyReactionPost(this.post, this.skip)
      .pipe(take(1))
      .subscribe(
        (reactions) => {
          /**
           * Concatenamos las reacciones
           */
          this.reactions = this.reactions.concat(reactions);

          this.skip = +15;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }else if(this.comment){
      this.reactionsService
      .anyReactionComment(this.comment, this.skip)
      .pipe(take(1))
      .subscribe(
        (reactions) => {
          /**
           * Concatenamos las reacciones
           */
          this.reactions = this.reactions.concat(reactions);

          this.skip = +15;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
