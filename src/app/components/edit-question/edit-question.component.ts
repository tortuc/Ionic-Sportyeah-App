import { Component, OnInit,Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {

  @Input() question

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  constructor() { }
 

  ngOnInit() {}

 deleteQuestion(i){
  this.delete.emit(i)
 }
 editQuestion(i){
  this.edit.emit(i)
 }
}
