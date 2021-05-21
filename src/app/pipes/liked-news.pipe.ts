import { Pipe, PipeTransform } from '@angular/core';
import { ILike } from '../models/iPost';
import { NewsService } from '../service/news.service';
import { UserService } from '../service/user.service';

@Pipe({
  name: 'likedNews'
})
export class LikedNewsPipe implements PipeTransform {

  

  constructor(
    private newsService: NewsService,
    private userService: UserService
  ) {}
  async transform(id: string, likes) {
    if (likes < 1) return false;
    try {
      let reaction: any = await this.newsService
        .userReactToNews(id, this.userService.User?._id)
        .toPromise();

      return reaction ? reaction : false;
    } catch (error) {
      return false;
    }
  }

}
