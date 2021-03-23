import { Pipe, PipeTransform } from '@angular/core';
import { IComment } from '../models/iPost';

@Pipe({
  name: 'commented'
})
export class CommentedPipe implements PipeTransform {

  transform(comments: IComment[],id: string): string {
    let mine = comments.find((item)=>{
      return item.user._id == id
    })
    return (mine)?'icomment':'';
  }

}
