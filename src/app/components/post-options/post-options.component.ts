import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  ToastController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { NewPostPage } from "src/app/dashboard/new-post/new-post.page";
import { ILike, IPost, IPostC, INewC, INew } from "src/app/models/iPost";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { Plugins } from "@capacitor/core";
import { Clipboard } from "@angular/cdk/clipboard";
import { LikesPostComponent } from "../likes-post/likes-post.component";
import { SharedsPostComponent } from "../shareds-post/shareds-post.component";
import { NewsService } from "src/app/service/news.service";
import { CommentPostComponent } from "src/app/post-components/comment-post/comment-post.component";

const { Share } = Plugins;

@Component({
  selector: "post-options",
  templateUrl: "./post-options.component.html",
  styleUrls: ["./post-options.component.scss"],
})
export class PostOptionsComponent implements OnInit {
  @Input() item: IPostC;
  @Input() isPost: boolean = false;
  constructor(
  ) {}
  ngOnInit() {}


}
