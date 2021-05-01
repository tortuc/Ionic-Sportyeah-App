import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IPost } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";
import { LoginService } from "src/app/service/login.service";
import { UserService } from "src/app/service/user.service";
import { CommentPostComponent } from "../comment-post/comment-post.component";

@Component({
  selector: "comments-in-pots",
  templateUrl: "./comments-in-pots.component.html",
  styleUrls: ["./comments-in-pots.component.scss"],
})
export class CommentsInPotsComponent implements OnInit {
  /**
   * Cuerpo con los datos del post, reacciones, comentarios y comparticiones
   */
  @Input() post: IPost;
  /**
   * Si se esta cargando desde la pagina del post
   */
  @Input() isPost: boolean = false;

  /**
   * Se creo un comentario
   */
  @Output() comments = new EventEmitter();

  constructor(
    private router: Router,
    public userService: UserService,
    private loginService: LoginService,
    private modalController: ModalController,
    private commentService: CommentService
  ) {}

  commented = false;

  countComments = 0;

  async ngOnInit() {
    this.getCountComments();
  }

  goToPost(id) {
    if (!this.isPost) {
      this.router.navigate([`/post/${id}`]);
    }
  }

  async getCountComments() {
    this.countComments = await this.commentService
      .getCountsOfComments(this.post._id)
      .toPromise();

    try {
      this.commented = await this.commentService.userCommentThisPost(
        this.userService.User?._id,
        this.post._id
      );
    } catch (error) {
      this.commented = false;
    }
  }

  async comment(post) {
    if (!this.userService.User) {
      this.loginService.goToLogin(`/post/${post._id}`);
    } else {
      let comment = await this.modalController.create({
        component: CommentPostComponent,
        componentProps: { post },
        backdropDismiss: false,
      });
      comment.onDidDismiss().then((data) => {
        this.getCountComments();
      });
      return comment.present();
    }
  }
}
