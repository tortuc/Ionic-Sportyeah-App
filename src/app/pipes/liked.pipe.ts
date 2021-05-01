import { Pipe, PipeTransform } from '@angular/core';
import { ILike } from '../models/iPost';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

@Pipe({
  name: 'liked'
})
export class LikedPipe implements PipeTransform {

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}
  async transform(id: string, likes) {
    if (likes < 1) return false;
    try {
      let reaction: any = await this.postService
        .userReactToPost(id, this.userService.User?._id)
        .toPromise();

      return reaction ? reaction : false;
    } catch (error) {
      return false;
    }
  }
}
