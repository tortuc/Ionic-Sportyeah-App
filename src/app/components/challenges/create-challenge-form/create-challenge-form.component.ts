import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";

@Component({
  selector: "app-create-challenge-form",
  templateUrl: "./create-challenge-form.component.html",
  styleUrls: ["./create-challenge-form.component.scss"],
})
export class CreateChallengeFormComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Input() formV: any;
  emojis: boolean = false;
  emojis2: boolean = false;
  public caretPosition = null;

  public form: FormGroup = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    if (this.formV) {
      this.form.controls.title.setValue(this.formV.title);
      this.form.controls.description.setValue(this.formV.description);
    }
    window.onclick = () => {
      this.emojis = false;
      this.emojis2 = false;
    };

    this.form.statusChanges.subscribe(() => {
      this.saveForm();
    });
  }

  focusout(e) {
    this.caretPosition = e.target.selectionStart;
  }

  saveForm() {
    this.next.emit(this.form.value);
  }

  addEmoji(ev) {
    let value = this.form.controls.title.value;
    const newText =
      value.substring(0, this.caretPosition) +
      ev.emoji.native +
      value.substring(this.caretPosition);

    this.form.controls.title.setValue(newText);
  }
  addEmoji2(ev) {
    let value = this.form.controls.description.value;
    const newText =
      value.substring(0, this.caretPosition) +
      ev.emoji.native +
      value.substring(this.caretPosition);

    this.form.controls.description.setValue(newText);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  openEmojis(e) {
    this.emojis = !this.emojis;
    this.emojis2 = false;
    e.stopPropagation();
  }
  openEmojis2(e) {
    this.emojis2 = !this.emojis2;
    this.emojis = false;

    e.stopPropagation();
  }
}
