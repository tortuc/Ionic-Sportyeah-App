import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/user.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'question-comment',
  templateUrl: './question-comment.component.html',
  styleUrls: ['./question-comment.component.scss'],
})
export class QuestionCommentComponent implements OnInit {
  @Input() data: any
  @Input() notified: boolean
  @Output() newItemEvent = new EventEmitter<boolean>();
constructor(
  public userService:UserService,
  public questionService:QuestionService,
) { }

  ngOnInit() {    
    console.log(this.data);
    this.questionService.findById(this.data._id).subscribe((response:any)=>{
      console.log(response);

      this.question = response.questionGroup[0];

    })
  }

question
  selectAnswer(id){
    if(this.userService.User != undefined){
      this.questionService.voteAnswer(id,this.userService.User._id).subscribe(()=>{
         this.ngOnInit()
      })
    }
  }
}
