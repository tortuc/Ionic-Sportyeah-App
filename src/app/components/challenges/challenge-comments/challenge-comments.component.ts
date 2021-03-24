import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { ChallengeService } from "../../../service/challenge.service";
import { TranslateService } from "@ngx-translate/core";
import { JdvimageService } from "../../../service/jdvimage.service";
import { FormBuilder } from "@angular/forms";
import { MentionsDirective } from "../../../directives/mentions.directive";
import { UserService } from "../../../service/user.service";
import {
  ModalController,
  LoadingController,
  IonInfiniteScroll,
} from "@ionic/angular";
import { Component, OnInit, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-challenge-comments",
  templateUrl: "./challenge-comments.component.html",
  styleUrls: ["./challenge-comments.component.scss"],
})
export class ChallengeCommentsComponent implements OnInit {
  @Input() comments: any[];
  @Input() referenceId: any;
  @Input() challenge: string;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("emojisContainer") emojisContainer: any;
  @ViewChild("emojiButton") emojiButton: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // public referenceId: any = null;
  // public comments: any[] = null;
  public index = 0;
  public commentsShown = [];
  public lastCaretPosition = 0;
  public emoji = false;
  public form = this.fb.group({
    message: ["", []],
    image: ["", []],
  });
  constructor(
    public mc: ModalController,
    public userService: UserService,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public imageService: JdvimageService,
    public translate: TranslateService,
    public challengeService: ChallengeService,
    public router: Router
  ) {}

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
    this.actualizar();
  }

  loadData() {
    let anterior = this.index;
    this.index += 8;
    let comments = [];
    for (let i = anterior; i < this.index; i++) {
      if (this.comments[i]) comments.push(this.comments[i]);
    }
    this.getUsersAllInfo(comments);
  }

  generatepag() {
    this.index = 0;
    this.index += 8;
    var comments = [];
    this.commentsShown = [];
    for (let i = 0; i < this.index; i++) {
      if (this.comments[i]) comments.push(this.comments[i]);
    }
    this.getUsersAllInfo(comments);
  }

  async actualizar() {
    const r: any = await this.challengeService
      .getById(this.challenge)
      .toPromise();
    this.commentsShown = [];
    this.index = 0;
    this.comments = r.challenge.challenged.comments.reverse();
    this.generatepag();
  }

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

  removeImg() {
    this.form.controls.image.setValue("");
  }

  setUser(user) {
    this.router.navigate([`/user/${user.username}`]);
    this.mc.dismiss();
  }
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
  async getUsersAllInfo(comments: any[]) {
    comments.map(async (comment: any) => {
      const user = await this.userService
        .getUserById(comment.userReference.referenceId)
        .toPromise();
      comment.userData = user;
      this.commentsShown.push(comment);
      this.infiniteScroll.complete();
    });
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];
  newValue($event) {
    this.form.controls.message.setValue($event);
  }

  send() {
    const user = {
      appName: "SportYeah",
      referenceId: this.userService.User._id,
    };
    const comment = {
      userReference: user,
      comment: this.form.value.message,
      image: this.form.value.image,
    };
    const body = {
      referenceId: this.referenceId,
      comment,
    };
    this.challengeService
      .createComment(body)
      .pipe(take(1))
      .subscribe((r: any) => {
        this.actualizar();
      });
    this.form.controls.message.setValue("");
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
}
