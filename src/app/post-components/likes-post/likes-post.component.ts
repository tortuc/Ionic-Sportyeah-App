import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ReactionsService } from "src/app/service/reactions.service";
import { UserService } from "src/app/service/user.service";
import { AllReactionsComponent } from "../all-reactions/all-reactions.component";
import { LikesReactionsComponent } from "../likes-reactions/likes-reactions.component";

@Component({
  selector: "likes-post",
  templateUrl: "./likes-post.component.html",
  styleUrls: ["./likes-post.component.scss"],
})
export class LikesPostComponent implements OnInit {
  @Input() post: string;

  @ViewChild("all") all: AllReactionsComponent;
  @ViewChild("likes") likes: LikesReactionsComponent;

  constructor(
    public userService: UserService,
    public router: Router,
    private modalCtrl: ModalController,
    private reactionService: ReactionsService,
    private cd: ChangeDetectorRef
  ) {}

  data = [];

  ngOnInit() {
    this.reactionService
      .reactionsByPost(this.post)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.data = data;
          console.log(data);
          
        },
        (err) => {}
      );
  }

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();

    if (el.scrollHeight - el.scrollTop < el.clientHeight + 400) {
      switch (this.segment) {
        case "all":
          this.all.scroll();
          break;

        default:
          this.likes.scroll();
          break;
      }
    }
  }

  segment = "all";
  goToProfile(username) {
    if (username == this.userService.User?.username) {
      this.router.navigate(["/profile"]);
    } else {
      this.router.navigate([`/user/${username}`]);
    }
    this.modalCtrl.dismiss({ dismiss: true });
  }

  dismiss() {
    this.modalCtrl.dismiss({ dismiss: true });
  }
}
