import { TranslateService } from "@ngx-translate/core";
import {
  ChallengeService,
  IReference,
} from "./../../../service/challenge.service";
import { AlertController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular";

interface IConditionAward {
  value: string;
}
@Component({
  selector: "app-create-award-challenge",
  templateUrl: "./create-award-challenge.component.html",
  styleUrls: ["./create-award-challenge.component.scss"],
})
export class CreateAwardChallengeComponent implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  @Input() challenged: IReference | null;
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("FormElementRef2") inputNode2: any;
  @ViewChild("emojiButton") emojiButton: ElementRef;
  @ViewChild("emojiContainer") emojiContainer: ElementRef;
  @ViewChild("emojiContainer2") emojiContainer2: ElementRef;
  @Output("save") save: EventEmitter<any> = new EventEmitter();
  public form: any = {
    place: "",
    title: "",
    description: "",
    media: "",
    condition: "",
  };
  public videoInvalid: boolean = true;
  public novideo: boolean = null;
  conditions: IConditionAward[] = [
    { value: "Likes" },
    { value: "Likes1" },
    { value: "Likes2" },
    { value: "Likes3" },
    { value: "Likes4" },
    { value: "Likes5" },
    { value: "Comments" },
    { value: "Challenges" },
    { value: "Shared" },
  ];
  emojis: boolean = false;
  emojis2: boolean = false;
  public caretPosition = null;
  public lastCaretPosition = 0;
  constructor(
    public toast: ToastController,
    public fb: FormBuilder,
    public trans: TranslateService,
    public img: ImgVideoUpload,
    public mc: ModalController,
    public alert: AlertController,
    public loadingController: LoadingController,
    public userService: UserService,
    public challengeService: ChallengeService
  ) {}

  ngOnInit() {
    window.onclick = () => {
      this.emojis = false;
      this.emojis2 = false;
    };
    setTimeout(() => {
      this.inputNode.el.addEventListener("focusout", (e) => {
        this.caretPosition = e.target.selectionStart;
      });
      this.inputNode2.el.addEventListener("focusout", (e) => {
        this.caretPosition = e.target.selectionStart;
      });
    }, 3000);
  }

  awardMedia() {
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((r) => {
      this.form.media = r;
    });
  }

  saveAward() {
    this.save.emit({ event: this.form });
    this.reset();
  }

  close() {
    this.save.emit(null);
    this.reset();
  }

  reset() {
    this.form = { place: "", title: "", description: "", media: "",date:"" };
  }
  addEmoji(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;
    let value = this.form.title;
    const newText =
      value.replace(/&nbsp;/g, " ").substring(0, this.caretPosition) +
      ev.emoji.native +
      value.replace(/nbsp;/g, "").substring(this.caretPosition);

    this.form.title = newText;
  }
  addEmoji2(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;
    let value = this.form.description;
    const newText =
      value.replace(/&nbsp;/g, " ").substring(0, this.caretPosition) +
      ev.emoji.native +
      value.replace(/nbsp;/g, "").substring(this.caretPosition);

    this.form.description = newText;
  }
  openEmojis(e) {
    this.emojis = !this.emojis;
    e.stopPropagation();
    // this.inputNode.nativeElement.onclick = (e)=>{
    //   e.stopPropagation();
    // }
    this.inputNode.el.onclick = function (e) {
      e.stopPropagation();
    };
    this.inputNode2.el.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojiButton.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
    this.emojiContainer.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
    this.emojiContainer2.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
  }
  openEmojis2(e) {
    this.emojis2 = !this.emojis2;
    e.stopPropagation();
    // this.inputNode.nativeElement.onclick = (e)=>{
    //   e.stopPropagation();
    // }
    this.inputNode.el.onclick = function (e) {
      e.stopPropagation();
    };
    this.inputNode2.el.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojiButton.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
    this.emojiContainer.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
    this.emojiContainer2.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
  }
}
