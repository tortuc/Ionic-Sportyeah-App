import { Pipe, PipeTransform } from '@angular/core';
import { ILike } from '../models/iPost';

@Pipe({
  name: 'liked'
})
export class LikedPipe implements PipeTransform {

  transform(likes: ILike[], id: string): unknown {
    let liked = likes.find((item)=>{
      return item.user._id == id
    })
    return (liked)?true:false;
  }

}
