import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { IPost } from "src/app/models/iPost";
import { ShareService } from "src/app/service/share.service";

@Component({
  selector: "app-shareds-post",
  templateUrl: "./shareds-post.component.html",
  styleUrls: ["./shareds-post.component.scss"],
})
export class SharedsPostComponent implements OnInit {
  @Input() post: string;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private sharedsService: ShareService
  ) {}

  shareds: IPost[] = [];

  ngOnInit() {
    this.getShareds();
  }

  skip = 0;
  getShareds() {
    this.sharedsService
      .getSharedsByPost(this.post, this.skip)
      .pipe(take(1))
      .subscribe((shareds) => {
        this.shareds = this.shareds.concat(shareds);
        this.skip += 10;
      });
  }

  dismiss() {
    this.modalCtrl.dismiss({ dismiss: true });
  }

  goToPost(id) {
    this.router.navigate([`/post/${id}`]);
    this.dismiss();
  }

  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();

    if (el.scrollHeight - el.scrollTop < el.clientHeight + 400) {
      this.getShareds();
    }
  }
}
