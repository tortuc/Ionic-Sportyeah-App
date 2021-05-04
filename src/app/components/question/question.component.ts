import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/user.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() data: any
  @Input() notified: boolean
  @Output() newItemEvent = new EventEmitter<boolean>();
constructor(
  public userService:UserService,
  public questionService:QuestionService,
) { }

  ngOnInit() {
    
  }


  selectAnswer(id){
    if(this.userService.User != undefined){
      this.questionService.voteAnswer(id,this.userService.User._id).subscribe(()=>{
         this.newItemEvent.emit(true)
      })
    }
  }
}
