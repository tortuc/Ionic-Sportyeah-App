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
// import { AllReactionsComponent } from "../reactions/all-reactions/all-reactions.component";
// import { AngryReactionsComponent } from "../reactions/angry-reactions/angry-reactions.component";
// import { HahaReactionsComponent } from "../reactions/haha-reactions/haha-reactions.component";
import { LikesReactionsComponent } from "../reactions/likes-reactions/likes-reactions.component";
// import { LoveReactionsComponent } from "../reactions/love-reactions/love-reactions.component";
// import { SadReactionsComponent } from "../reactions/sad-reactions/sad-reactions.component";
// import { WowReactionsComponent } from "../reactions/wow-reactions/wow-reactions.component";

@Component({
  selector: "likes-post",
  templateUrl: "./likes-post.component.html",
  styleUrls: ["./likes-post.component.scss"],
})
export class LikesPostComponent implements OnInit {
  @Input() post: string;

  // @ViewChild("all") all: AllReactionsComponent;
  @ViewChild("likes") likes: LikesReactionsComponent;
  // @ViewChild("love") love: LoveReactionsComponent;
  // @ViewChild("haha") haha: HahaReactionsComponent;
  // @ViewChild("wow") wow: WowReactionsComponent;
  // @ViewChild("sad") sad: SadReactionsComponent;
  // @ViewChild("angry") angry: AngryReactionsComponent;

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
        },
        (err) => {
        }
      );
  }

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();

    if (el.scrollHeight - el.scrollTop < el.clientHeight + 400) {
      switch (this.segment) {
        // case "all":
        //   this.all.scroll();
        //   break;
        case "1":
          this.likes.scroll();
        //   break;
        // case "2":
        //   this.love.scroll();
        //   break;
        // case "3":
        //   this.haha.scroll();
        //   break;
        // case "4":
        //   this.wow.scroll();
        //   break;
        // case "5":
        //   this.sad.scroll();
        //   break;
        // case "6":
        //   this.angry.scroll();
        //   break;

        default:
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
