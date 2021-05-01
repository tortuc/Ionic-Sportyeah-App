import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "follow-button",
  templateUrl: "./follow-button.component.html",
  styleUrls: ["./follow-button.component.scss"],
})
export class FollowButtonComponent implements OnInit {
  /**
   * _id del usuario
   */
  @Input() user: string;
  /**
   * username del usuario
   */
  @Input() username: string = null;
  /**
   * si el boton es normal, o outline
   */
  @Input() fill: "normal" | "outline" = "outline";
  /**
   * Si el boton es normal, o con bordes redondos
   */
  @Input() shape: "normal" | "rounded" = "rounded";
  /**
   * Si el color es primary o secondary
   */
  @Input() color: "primary" | "secondary" = "primary";
  constructor(
    public userService: UserService,
    public translate: TranslateService
  ) {}
  /**
   * Si estoy siguiendo al usuario
   */
  follow = false;

  /**
   * Verifica si lo esta siguiendo
   */
  checkFollow() {
    // si lo sigue se pondra true
    this.follow = this.userService.isFollow(this.user);
  }

  /**
   * Seguir o dejar de seguir al usuario
   */
  async followUser() {
    // si lo estoy siguiendo, lo dejo de seguir
    if (this.follow) {
      await this.userService.unFollow(this.user);
      this.checkFollow();
    } else {
      // si no lo sigo
      await this.userService.follow(this.user, this.username);
      this.checkFollow();
    }
  }

  ngOnInit() {
    this.checkFollow();
  }
}
