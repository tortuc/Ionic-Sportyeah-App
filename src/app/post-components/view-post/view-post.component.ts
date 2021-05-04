import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { IPost } from "src/app/models/iPost";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.scss"],
})
export class ViewPostComponent implements OnInit {
  @Input() post: IPost;
  /**
   * Solo es true si esta en la pagina del post
   */
  @Input() postPage: boolean = false;

  @Output() comments = new EventEmitter();

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  edited() {
    this.postService
      .getPost(this.post._id)
      .pipe(take(1))
      .subscribe((post: IPost) => {
        this.post = post;

        if (this.postPage && this.post.deleted == true) {
          this.router.navigate(["/dashboard"]);
        }
      });
  }

  /**
   * Si hay un nuevo comentario, este me traera todos los comentarios del post, entonces lo rebotamos como otro evento
   * @param data
   */
  newComment(data) {
    this.comments.emit(data);
  }
}
