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
  async transform(id,group,notified){
    try {
      let answer:any = await this.questionService.userVotedAnswer(group,this.userService.User?._id).toPromise()
      let voted = answer?._id == id?'block userVoted':'block'
      // classReturn += voted
      if(!notified && answer){
        return voted
      }else if(notified && !answer){
        return 'block'
      }else if(notified && answer){
        return voted
      }
      else{
        return 'progress-item-unlok';
      }
      // return answer?voted:'progress-item-unlok'
    } catch (error) {
      return 'progress-item-unlok';
    }
   
  }


}
 