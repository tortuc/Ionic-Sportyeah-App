import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.page.html",
  styleUrls: ["./edit-post.page.scss"],
})
export class EditPostPage implements OnInit {
  @Input() post: IPost;
  loading: HTMLIonLoadingElement;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: ElementRef;
  @ViewChild("emojisContainer") emojisContainer: ElementRef;
  @ViewChild("emojiButton") emojiButton: ElementRef;

  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private fb: FormBuilder,
    public JDVImage: JdvimageService,
    public loadingCtrl: LoadingController,
    private postService: PostService
  ) {}

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  newValue($event) {
    this.form.controls.message.setValue($event);
  }
  users = [];

  // tslint:disable-next-line: member-ordering
  form = this.fb.group({
    message: ["", [Validators.required]],
    image: [""],
    video: [""],
  });

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    this.setValues();

    window.onclick = () => {
      this.emoji = false;
    };
  }

  setValues() {
    this.form.controls.message.setValue(this.post.message);
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

  save() {
    this.loading.present();
    this.postService
      .updateOne(this.post._id, this.form.value)
      .toPromise()
      .then((resp) => {
        this.loading.dismiss();
        this.modalController.dismiss({
          dismissed: true,
          edited: true,
        });
      })
      .catch((err) => {
        this.loading.dismiss();
      });
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
