import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../service/user.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() likes: any[]
    
constructor(
  public userService:UserService,
  public questionService:QuestionService,
) { }

  ngOnInit() {}


  selectAnswer(id){
    if(this.userService.User != undefined){
      this.questionService.voteAnswer(id,this.userService.User._id).subscribe(()=>{
        // this.getPost(this.item.post._id)
      })
    }
  }
}
