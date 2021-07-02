import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../../service/user.service";
import { QuestionService } from "src/app/service/question.service";

@Component({
  selector: "question-comment",
  templateUrl: "./question-comment.component.html",
  styleUrls: ["./question-comment.component.scss"],
})
export class QuestionCommentComponent implements OnInit {
  @Input() questionId: any;
  constructor(
    public userService: UserService,
    public questionService: QuestionService
  ) {}
    cincuenta=50;
  ngOnInit() { 
  
    this.questionService
      .findById(this.questionId)
      .subscribe((response: any) => {
        this.question = response.questionGroup;
      });
  }

  question;
  selectAnswer(id) {
    if (this.userService.User != undefined) {
      this.questionService
        .voteAnswer(id, this.userService.User._id)
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }
  setMyStyle(value) {
    console.log(value);
    
    let styles = {
      'background': `linear-gradient(to right,  #9cc4e5 0%,#9cc4e5 ${value}%,#f6f6f6 ${value}%,#f6f6f6 100%)`,
    };
    return styles;
}

}
