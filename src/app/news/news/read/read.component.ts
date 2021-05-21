import { Component, OnInit } from "@angular/core";
import { NewsService } from "../../../service/news.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "src/app/service/question.service";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { take } from "rxjs/operators";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-read",
  templateUrl: "./read.component.html",
  styleUrls: ["./read.component.scss"],
})
export class ReadComponent implements OnInit {
  constructor(
    public newsService: NewsService,
    private route: ActivatedRoute,
    public questionService: QuestionService,
    public userService: UserService,
    private viewsSponsorService: ViewsSponsorService,
    public commentService: CommentService,

  ) {
    this.idNews = route.snapshot.paramMap.get("id");
    this.getNews(this.idNews);
  }
  idNews;
  async getNews(id) {
    await this.newsService
      .findById(id)
      .toPromise()
      .then((response: any) => {
        this.news = response;
        this.getComments();
      })
      .catch((err) => {
        this.news = 404;
      });
    // this.notified = this.news.news.question
    //   ? this.news.news.question.notified
    //   : undefined;
  }
  news = undefined;
  item = undefined;
  // notified = null;

  ngOnInit() {}
  comments = [];
  loading = false;
  skip = 0;

  getComments() {
    this.loading = true;
    
    this.commentService
      .getCommentsByNews(this.news.news._id, this.skip)
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

  // comments($event) {
  //   this.news.comments = $event;
  // }

  goToSponsor(sponsor,name, id, username, post_id) {
    if (id != this.userService.User._id) {
      this.userService.getUserByUsername(username).subscribe((resp: any) => {
        this.viewsSponsorService
          .createSponsorView({
            user: resp.user._id,
            visitor: this.userService.User._id,
            from: "news",
            link: `/news/read/${post_id}`,
            nameSponsor: name,
          })
          .subscribe((response) => {
            window.location.replace(sponsor);
          });
      });
    }
  }

  goToSponsorComment(sponsor,name, id, news_id) {
    if (id != this.userService.User._id) {
      this.viewsSponsorService
        .createSponsorView({
          user: id,
          visitor: this.userService.User._id,
          from: "comment",
          link: `/news/read/${news_id}`,
          nameSponsor: name,
        })
        .subscribe((response) => {
          window.location.replace(sponsor);
        });
    }
  }

  voted(voted: boolean) {
    if (voted) {
      this.getNews(this.idNews);
    }
  }


  isLink(origen){
    let string: string = origen;
      let match = string.match(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
      );
      if(match){
        window.open(origen);
      }
  }


  newComment(event) {
    this.comments.unshift(event);
  }
}
