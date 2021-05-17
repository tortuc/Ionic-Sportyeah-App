import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IPost } from "src/app/models/iPost";
import { CommentPostComponent } from "src/app/post-components/comment-post/comment-post.component";
import { CommentService } from "src/app/service/comment.service";
import { LoginService } from "src/app/service/login.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'comments-in-news',
  templateUrl: './comments-in-news.component.html',
  styleUrls: ['./comments-in-news.component.scss'],
})
export class CommentsInNewsComponent implements OnInit {
/**
   * Cuerpo con los datos del news, reacciones, comentarios y comparticiones
   */
 @Input() news
 /**
  * Si se esta cargando desde la pagina del news
  */
 @Input() isNews: boolean = false;

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

    ) { }

    commented = false;

    countComments = 0;
  
    async ngOnInit() {
      this.getCountComments();
    }
  
    goToNews(id) {
      if (!this.isNews) {
        this.router.navigate([`news/read/${id}`]);
      }
    }
  
    async getCountComments() {
      this.countComments = await this.commentService
        .getCountsOfCommentsNews(this.news._id)
        .toPromise();
  
      try {
        this.commented = await this.commentService.userCommentThisNews(
          this.userService.User?._id,
          this.news._id
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
 