import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Platform } from "@ionic/angular";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.page.html",
  styleUrls: ["./ranking.page.scss"],
})
export class RankingPage implements OnInit {
  //@ViewChild('slide') slide;

  constructor(
    private postService: PostService,
    private userService: UserService,
    public platform: Platform,

  ) {
    this.postService.getAllPost().subscribe((post: any) => {
      this.todolosPost = post;
      /*  this.filterAllPost()
      this.userPosition() */
    });
  }

  segment = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  next(slides){
    slides.slideNext(); // slide to next
  }
  prev(slides){
    slides.slidePrev(); // slide to next
  }
  ngOnInit() {}
  positionLike;
  userLike;
  positionComment;
  userComment;
  positionShared;
  userShared;
  //Datos para los post,en seccion de post
  todolosPost = [];
  postUser = [];
  likes = [];
  comments = [];
  shareds = [];
  interaccionActual = "";
  actualLikes() {
    this.interaccionActual = "likes";
  }
  actualComments() {
    this.interaccionActual = "comments";
  }
  actualShareds() {
    this.interaccionActual = "shareds";
  }
  country: boolean = false;
}
