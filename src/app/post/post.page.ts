import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ImageComponent } from "../chat/image/image.component";
import { AddFriendsPage } from "../dashboard/add-friends/add-friends.page";
import { PostService } from "../service/post.service";
import { UserService } from "../service/user.service";
import { ViewsProfileService } from "src/app/service/views-profile.service";
import { CommentService } from "../service/comment.service";
import { take } from "rxjs/operators";
import { ViewsSponsorService } from "../service/views-sponsor.service";



@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private modalController: ModalController,
    private modalCtrl: ModalController,
    private viewsProfileService: ViewsProfileService,
    public commentService: CommentService,
    private viewsSponsorService:ViewsSponsorService
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
      .then((post: any) => {

        this.item = post;

        this.getComments();
      })
      .catch((err) => {
        // handle err
        this.item = 404;
      });
  }
  ngOnInit() {}
  item = null;

  comments = [];
  loading = false;
  skip = 0;
  getComments() {
    this.loading = true;
    this.commentService
      .getCommentsByPost(this.item.post._id, this.skip)
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

  async openImg(msg) {
    let modal = await this.modalCtrl.create({
      component: ImageComponent,
      componentProps: { msg },
    });

    return modal.present();
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
            link: `/post/${this.item.post._id}`,
          })
          .subscribe((response) => {
            this.router.navigate([`/user/${username}`]);
          });
        })
      }}


   
  


  goToSponsorComment(sponsor,id,post_id){
    if(id != this.userService.User._id){
     
          this.viewsSponsorService
          .createSponsorView(
            {
             user:id,
             visitor:this.userService.User._id,
             from:"comment",
             link:`/post/${post_id}`,
             urlSponsor:sponsor
           }
           )
            .subscribe((response) => {
              window.location.replace(sponsor);
            });

      }
  }

  async searchFriend(){
    let modal = await this.modalController.create({
      component: AddFriendsPage,
      cssClass: 'my-custom-class'
    });
  }

  goToMyProfile() {
    this.router.navigate(["/profile"]);
  }


  // comments($event) {
  //   this.item.comments = $event;
  // }

  voted(voted: boolean) {
    if (voted) {
      this.getPost(this.item.post._id);
    }
  }

  newComment(event) {
    this.comments.unshift(event);
  }
}
