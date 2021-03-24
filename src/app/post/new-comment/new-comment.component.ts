import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost, INew } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { NewsService } from "src/app/service/news.service";

@Component({
  selector: "app-new-comment",
  templateUrl: "./new-comment.component.html",
  styleUrls: ["./new-comment.component.scss"],
})
export class NewCommentComponent implements OnInit {
  @Input() post: IPost;
  @Input() news: INew;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("emojisContainer") emojisContainer: any;
  @ViewChild("emojiButton") emojiButton: any;

  constructor(
    private modalCtrl: ModalController,
    public userService: UserService,
    public fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private imageService: JdvimageService,
    private postService: PostService,
    public newsService: NewsService
  ) {}

  form = this.fb.group({
    message: ["", []],
    image: ["", []],
  });

  ngOnInit() {
    console.log(this.news);
    window.onclick = () => {
      this.emoji = false;
    };
  }
  lastCaretPosition = 0;
  addEmoji(ev) {
    this.mentions.usersMetions.forEach((element) => {
      this.form.controls.message.setValue(
        this.form.controls.message.value.replaceAll(
          element.url,
          element.fullname
        )
      );
    });

    this.lastCaretPosition != 0 && this.lastCaretPosition == this.mentions.pos
      ? (this.mentions.pos = this.mentions.pos + 2)
      : null;

    this.lastCaretPosition = this.mentions.pos;

    const newText =
      this.form.controls.message.value
        .replace(/&nbsp;/g, " ")
        .substring(0, this.mentions.pos) +
      ev.emoji.native +
      this.form.controls.message.value
        .replace(/&nbsp;/g, "")
        .substring(this.mentions.pos);
    this.form.controls.message.setValue(newText);

    this.mentions.usersMetions.forEach((element) => {
      this.form.controls.message.setValue(
        this.form.controls.message.value.replaceAll(
          element.fullname,
          element.url
        )
      );
    });
  }

  emoji = false;

  openEmojis() {
    this.emoji = !this.emoji;

    this.inputNode.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojiButton.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojisContainer.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
  }

  send() {
    if (this.form.value.message != null || this.form.value.image != null) {
      let comment = this.form.value;
      if (this.post) {
        comment.post = this.post._id;
        this.postService
          .newComment(comment)
          .toPromise()
          .then((comments) => {
            this.modalCtrl.dismiss({
              action: "comment",
              comments,
              post: this.post,
            });
          })
          .catch((err) => {
            // handle err
          });
      } else if (this.news) {
        console.log("es el new-comment");
        comment.news = this.news._id;
        this.newsService
          .newComment(comment)
          .toPromise()
          .then((comments) => {
            this.modalCtrl.dismiss({
              action: "comment",
              comments,
              news: this.news,
            });
          })
          .catch((err) => {
            // handle err
          });
      }
    }
  }

  async uploadImg($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();

    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.imageService
      .uploadImage(formData)
      .toPromise()
      .then((url) => {
        loading.dismiss();
        this.form.controls.image.setValue(url);
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  removeImg() {
    this.form.controls.image.setValue("");
  }

  dismiss() {
    this.modalCtrl.dismiss({
      action: "closed",
    });
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];
  newValue($event) {
    this.form.controls.message.setValue($event);
  }
}
