import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { take } from "rxjs/operators";
import { ILike } from "src/app/models/iPost";
import { ReactionsService } from "src/app/service/reactions.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'all-reactions-news',
  templateUrl: './all-reactions-news.component.html',
  styleUrls: ['./all-reactions-news.component.scss'],
})
export class AllReactionsNewsComponent implements OnInit {
 /**
   * _id De la publicacion
   */
  @Input() news: string;

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
  ) { }

  ngOnInit() {
    this.getReactionsNews();
  }

   /**
   * Si el usuario hizo scroll, buscar mas reacciones
   */
    scroll() {
      if (!this.loading) {
        this.getReactionsNews();
      }
    }
  
    /**
     * loading
     */
    loading = false;
  
 /**
   * Obtiene las reacciones de cualquier tipo, de 15 en 15
   */
  getReactionsNews() {
    this.loading = true;
    this.reactionsService
      .anyReactionNews(this.news, this.skip)
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
