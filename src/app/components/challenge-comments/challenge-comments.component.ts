import { FormBuilder } from "@angular/forms";
import { MentionsDirective } from "./../../directives/mentions.directive";
import { UserService } from "./../../service/user.service";
import { ModalController } from "@ionic/angular";
import { Component, OnInit, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-challenge-comments",
  templateUrl: "./challenge-comments.component.html",
  styleUrls: ["./challenge-comments.component.scss"],
})
export class ChallengeCommentsComponent implements OnInit {
  @Input() comments: any[];
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("emojisContainer") emojisContainer: any;
  @ViewChild("emojiButton") emojiButton: any;

  public lastCaretPosition = 0;
  public emoji = false;
  public form = this.fb.group({
    message: ["", []],
    image: ["", []],
  });
  constructor(
    public mc: ModalController,
    public userService: UserService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
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
    this.mentions.setUser(user);
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
  public getUsersAllInfo(comments: any[]) {
    comments = comments.map((comment: any) => {
      const user = this.userService
        .getUserById(comment.userReference.referenceId)
        .toPromise();
      console.log(user);
      comment.userData = user;
      return comment;
    });
    console.log(comments);
    this.comments = comments;
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];
  newValue($event) {
    this.form.controls.message.setValue($event);
  }

  public send() {
    this.form.value;
  }
}
