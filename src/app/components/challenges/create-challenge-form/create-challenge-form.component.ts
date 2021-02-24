import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-create-challenge-form",
  templateUrl: "./create-challenge-form.component.html",
  styleUrls: ["./create-challenge-form.component.scss"],
})
export class CreateChallengeFormComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  public form: FormGroup = this.fb.group({
    // challenge: ["", [Validators.required]],
    title: ["", Validators.required],
    description: ["", Validators.required],
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit() {}

  saveForm(){
    console.log(this.form.value);
    this.next.emit(this.form.value);
  }
}
