import { Pipe, PipeTransform } from '@angular/core';
import { groupBy } from 'rxjs/operators';
import { QuestionService } from 'src/app/service/question.service'
import { UserService } from '../service/user.service';
@Pipe({
  name: 'canVote'
})
export class CanVotePipe implements PipeTransform {
  constructor(
    private questionService:QuestionService,
    private userService:UserService
  ){}
  async transform(id,group){
    console.log(group)
    try {
      let answer:any = await this.questionService.userVotedAnswer(group,this.userService.User?._id).toPromise()
      let voted = (answer?._id == id)?'block userVoted':'block'
      console.log(answer)
      return answer?voted:'progress-item-unlok'
    } catch (error) {
      console.log(error)
      return 'progress-item-unlok';
    }
   
  }


}
 