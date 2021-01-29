import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { createJsxClosingElement } from "typescript";
import { element } from "protractor";
import { ClassField } from "@angular/compiler";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.page.html",
  styleUrls: ["./new-post.page.scss"],
})
export class NewPostPage implements OnInit {
  @Input() post: IPost;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: ElementRef;
  @ViewChild("emojisContainer") emojisContainer: ElementRef;
  @ViewChild("emojiButton") emojiButton: ElementRef;

  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    public JDVImage: JdvimageService,
    public loadingCtrl: LoadingController,
    private postService: PostService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
  }

  urlVideo = null;
  videoFile = null;

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    image: [""],
    video: [null],
    post: [null],
  });

  closeVideo() {
    this.urlVideo = null;
    this.videoFile = null;
  }

  async uploadVideo($event) {
    this.urlVideo = URL.createObjectURL($event.target.files[0]);
    this.videoFile = $event.target.files[0];
  }

  async uploadImg($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();

    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.JDVImage.uploadImage(formData)
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

  newValue($event) {
    this.form.controls.message.setValue($event);
  }

  async save() {
    if (this.videoFile == null) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      let post = this.form.value;
      if (this.post) {
        post.post = this.post._id;
      }
      this.postService
        .create(post)
        .toPromise()
        .then((post) => {
          loading.dismiss();

          this.modalController.dismiss({
            dismissed: true,
            create: true,
            post,
          });
        })
        .catch((err) => {
          loading.dismiss();
        });
    } else {
      let form = new FormData();
      form.append("video", this.videoFile);
      let post = this.form.value;
      if (this.post) {
        post.post = this.post._id;
      }
      this.modalController.dismiss({
        dismissed: true,
        create: false,
        video: form,
        post: post,
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
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
}
