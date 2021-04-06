import { Component, OnInit,Input ,Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {

  @Input() question
  @Input() badDate:boolean;

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  constructor() {}
 
  ngOnInit() {
    this.limitYear = moment().add(3,'year').format('YYYY-MM-DD').toString();
  }

 deleteQuestion(i){
  this.delete.emit(i)
 }
 editQuestion(i){
  this.edit.emit(i)
 }
today = moment().format('YYYY-MM-DD')
limitYear;
// days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
// months = [0,1,2,3,4,5,6,7,8,9,10,11];
// years = [];
whitTime:boolean=false;
endDate



}
