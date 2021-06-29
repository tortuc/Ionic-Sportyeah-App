import { Component, Input, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { IComment } from "src/app/models/iPost";
import { CommentService } from "src/app/service/comment.service";

enum Texts {
  show = "showResponds",
  hide = "hideResponds",
}

@Component({
  selector: "view-responds-comment",
  templateUrl: "./view-responds-comment.component.html",
  styleUrls: ["./view-responds-comment.component.scss"],
})
export class ViewRespondsCommentComponent implements OnInit {
  public readonly Texts = Texts;
  @Input() comment: IComment;

  constructor(private readonly commentService: CommentService) {}

  ngOnInit() {
    this.commentService.newCommen$.subscribe((comment) => {
      if (comment.comment == this.comment._id) {
        this.comments.push(comment);
      }
    });
    this.commentService.showResponds$.subscribe((comment)=>{
      if(comment._id == this.comment._id){
        this.show = true
      }
    })
    this.getComments();
  }

  show = false;

  comments = [];
  loading = false;
  skip = 0;
  all = false;
  getComments() {
    this.loading = true;
    this.commentService
      .getRespondsByComments(this.comment._id, this.skip)
      .pipe(take(1))
      .subscribe(
        (comments) => {
          this.loading = false;
          this.comments = this.comments.concat(comments);
          this.skip += 5;
          if (comments.length < 5) {
            this.all = true;
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

  Deletedcomments(index) {
    this.comments.splice(index, 1);
  }
}
