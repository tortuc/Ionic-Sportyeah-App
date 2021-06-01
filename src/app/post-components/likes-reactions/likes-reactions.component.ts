import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { take } from "rxjs/operators";
import { ILike } from "src/app/models/iPost";
import { ReactionsService } from "src/app/service/reactions.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "likes-reactions",
  templateUrl: "./likes-reactions.component.html",
  styleUrls: ["./likes-reactions.component.scss"],
})
export class LikesReactionsComponent implements OnInit, OnChanges {
  /**
   * _id De la publicacion
   */
  @Input() post: string;

  /**
   * _id De la publicacion
   */
  @Input() type: number;

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
    console.log(this.post);
    
  }

  ngOnChanges() {
    this.skip = 0;
    this.reactions = [];
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
    this.reactionsService
      .ReactionsPostByType(this.post, this.skip, Number(this.type))
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
