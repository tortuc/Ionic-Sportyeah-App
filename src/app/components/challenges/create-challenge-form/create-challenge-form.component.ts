import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-create-challenge-form",
  templateUrl: "./create-challenge-form.component.html",
  styleUrls: ["./create-challenge-form.component.scss"],
})
export class CreateChallengeFormComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Input() formV : any;
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("FormElementRef2") inputNode2: any;
  @ViewChild("emojiButton") emojiButton: ElementRef;
  @ViewChild("emojiContainer") emojiContainer: ElementRef;
  @ViewChild("emojiContainer2") emojiContainer2: ElementRef;
  emojis: boolean = false;
  emojis2: boolean = false;
  public caretPosition = null;
  public lastCaretPosition = 0;

  public form: FormGroup = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    if(this.formV){
      this.form.controls.title.setValue(this.formV.title)
      this.form.controls.description.setValue(this.formV.description)
    }
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

    this.form.statusChanges.subscribe(()=>{
      this.saveForm()
    })
  }

  saveForm() {
    this.next.emit(this.form.value);
  }

  addEmoji(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;
    let value = this.form.controls.title.value;
    const newText =
      value.replace(/&nbsp;/g, " ").substring(0, this.caretPosition) +
      ev.emoji.native +
      value.replace(/nbsp;/g, "").substring(this.caretPosition);

    this.form.controls.title.setValue(newText);
  }
  addEmoji2(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;
    let value = this.form.controls.description.value;
    const newText =
      value.replace(/&nbsp;/g, " ").substring(0, this.caretPosition) +
      ev.emoji.native +
      value.replace(/nbsp;/g, "").substring(this.caretPosition);

    this.form.controls.description.setValue(newText);
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
