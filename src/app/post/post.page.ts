import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { ViewsProfileService } from "src/app/service/views-profile.service";
import { CommentService } from "../service/comment.service";
import { take } from "rxjs/operators";
import { IPost } from "../models/iPost";
import { Meta } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  notFound: boolean;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private viewsProfileService: ViewsProfileService,
    public commentService: CommentService,
    private translate: TranslateService,
    private readonly metaService: Meta
  ) {
    this.getPost(route.snapshot.paramMap.get("id"));
  }

  goBack() {
    this.router.navigate(["/dashboard"]);
  }
  getPost(id) {
    this.postService
      .getPost(id)
      .toPromise() //agregamos el id del usuario actual
      .then((post: IPost) => {
        this.post = post;
        this.getComments();
        this.seo(post);
      })
      .catch((err) => {
        // handle err
        this.notFound = true;
      });
  }
  ngOnInit() {}
  post: IPost;
  comments = [];
  loading = false;
  skip = 0;
  getComments() {
    this.loading = true;
    this.commentService
      .getCommentsByPost(this.post._id, this.skip)
      .pipe(take(1))
      .subscribe(
        (comments) => {
          this.loading = false;
          this.comments = this.comments.concat(comments);
          this.skip += 10;
        },
        () => {
          this.loading = false;
        }
      );
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  goToProfile(id, username) {
    if (id == this.userService.User?._id) {
      this.router.navigate(["/profile"]);
    } else {
      //this.router.navigate([`/user/${username}`])
      this.userService.getUserByUsername(username).subscribe((resp: any) => {
        this.viewsProfileService
          .createProfileView({
            user: resp.user._id,
            visitor: this.userService.User._id,
            from: "comment",
            link: `/post/${this.post._id}`,
          })
          .subscribe((response) => {
            this.router.navigate([`/user/${username}`]);
          });
      });
    }
  }

  async seo(post) {
    let reactions = await this.postService
      .countReactionsByPost(post._id)
      .toPromise();

    let comments = await this.commentService
      .getCountsOfComments(post._id)
      .toPromise();

    let image = post.files.find((x) => x.format == "image");

    let title = this.translate.instant("seopost.title", post);
    let img = image ? image.url : post.user.photo;
    let description = this.translate.instant("seopost.description", {
      reactions,
      comments,
      title,
    });

    this.metaService.updateTag({
      property: "og:description",
      content: description,
    });
    this.metaService.updateTag({ property: "og:title", content: title });
    this.metaService.updateTag({ property: "og:image", content: img });
    this.metaService.updateTag({
      property: "og:url",
      content: `https://app.sportyeah.com/post/${post._id}`,
    });
  }

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }


   Deletedcomments(index) {
     console.log("Deletedcomments")
    console.log(this.comments)

     //this.getComments()
     //this.comments.unshift();
     this.comments.splice(index,1)
     //this.getPost(this.post._id);
   }

   Updatecomments(commentUpdate) {
    console.log("Deletedcomments")
    console.log("this.comments")

    //this.getComments()
    //this.comments.unshift();
    //this.comments.splice(index,1)
    this.comments.find(comment => comment.post == commentUpdate.post).message = commentUpdate.message;

    //this.getPost(this.post._id);
  }


  voted(voted: boolean) {
    if (voted) {
      this.getPost(this.post._id);
    }
  }

  newComment(event) {
    console.log("newComment")
    this.comments.unshift(event);
  }
}
