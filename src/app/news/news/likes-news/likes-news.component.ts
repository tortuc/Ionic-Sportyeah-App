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
import { AllReactionsComponent } from "src/app/post-components/all-reactions/all-reactions.component";
import { LikesReactionsComponent } from "src/app/post-components/likes-reactions/likes-reactions.component";
import { ReactionsService } from "src/app/service/reactions.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-likes-news',
  templateUrl: './likes-news.component.html',
  styleUrls: ['./likes-news.component.scss'],
})
export class LikesNewsComponent implements OnInit {
  @Input() news: string;

  @ViewChild("all") all: AllReactionsComponent;
  @ViewChild("likes") likes: LikesReactionsComponent;

  constructor(
    public userService: UserService,
    public router: Router,
    private modalCtrl: ModalController,
    private reactionService: ReactionsService,
    private cd: ChangeDetectorRef
  ) { }

  data = [];

  ngOnInit() {
    this.reactionService
      .reactionsByNews(this.news)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.data = data;
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
