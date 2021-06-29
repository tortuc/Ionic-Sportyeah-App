import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IComment } from "src/app/models/iPost";
import { CommentPostComponent } from "src/app/post-components/comment-post/comment-post.component";
import { CommentService } from "src/app/service/comment.service";
import { LoginService } from "src/app/service/login.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'comments-in-comment',
  templateUrl: './comments-in-comment.component.html',
  styleUrls: ['./comments-in-comment.component.scss']
})
export class CommentsInCommentComponent implements OnInit {
  @Input() comment:IComment;
  @Input() respond:boolean = false;

  
  

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

  

  async getCountComments() {
    this.countComments = await this.commentService
      .getCountsOfCommentsInComment(this.comment._id)
      .toPromise();

    try {
      this.commented = await this.commentService.userRespondThisComment(
        this.userService.User?._id,
        this.comment._id
      );
    } catch (error) {
      this.commented = false;
    }
  }

  async newComment() {
    if (!this.userService.User) {
      // this.loginService.goToLogin(`/post/${this.comment.post}`);
    } else {
      if(this.respond){
        this.commentService.respondComment$.next(this.comment)
      }else{
        let comment = await this.modalController.create({
          component: CommentPostComponent,
          componentProps: { comment:this.comment },
          backdropDismiss: false,
        });
        comment.onDidDismiss().then((data) => {
          this.getCountComments();
        });
        return comment.present();
      }
      
    }
  }

  showResponds(){
    this.commentService.showResponds$.next(this.comment)
  }
}
