import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { IComment } from 'src/app/models/iPost';
import { CommentService } from 'src/app/service/comment.service';

enum Texts {
  show = "Mostrar respuestas",
  hide = "Ocultar respuestas"
}

@Component({
  selector: 'view-responds-comment',
  templateUrl: './view-responds-comment.component.html',
  styleUrls: ['./view-responds-comment.component.scss']
})
export class ViewRespondsCommentComponent implements OnInit {

  public readonly Texts = Texts
  @Input() comment:IComment

  constructor(
    private readonly commentService:CommentService
  ) { }

  ngOnInit() {
    this.getComments()
  }


  show = false;

  comments = [];
  loading = false;
  skip = 0;
  getComments() {
    this.loading = true;
    this.commentService
      .getRespondsByComments(this.comment._id, this.skip)
      .pipe(take(1))
      .subscribe(
        (comments) => {
          this.loading = false;
          this.comments = this.comments.concat(comments);
          this.skip += 10;
          console.log(this.comments)
        },
        () => {
          this.loading = false;
        }
      );
  }


}
