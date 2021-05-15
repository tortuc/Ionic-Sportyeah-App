import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "edit-question",
  templateUrl: "./edit-question.component.html",
  styleUrls: ["./edit-question.component.scss"],
})
export class EditQuestionComponent implements OnInit {
  @Input() question;
  @Input() badDate: boolean;

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
  }

  deleteQuestion() {
    this.delete.emit();
  }
  editQuestion() {
    this.edit.emit();
  }
  today = moment().add(1, "day").format("YYYY-MM-DD");
  limitYear = moment().add(1, "year").format("YYYY-MM-DD").toString();

  whitTime: boolean = false;
  endDate;
}
