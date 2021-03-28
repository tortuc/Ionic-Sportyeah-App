import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../service/user.service';


@Pipe({
  name: 'links'
})
export class LinksPipe implements PipeTransform {


  constructor(
    public userService:UserService
    ){
    
  }

  
  linkify(s,username) {
    s = s.replace('<','&lt').replace('</','&lt/')
    s = s.replace('&ltdiv>','<div>').replace('&lt/div>','</div>')
    s = s.replace('&ltstrong','<strong').replace('&lt/strong>','</strong>')
    s = s.replace('&lta','<a').replace('&lt/a>','</a>').replace('&lt/span>','</span>')
    s = s.replace(`a class="user" href="/#/user/${username}"`,`a class="user" href="/#/profile"`)
    s = s.replace('&lt;3','❤️')
    s = s.replace('<3','❤️')
    s = s.replace('&lt3','❤️')
    s = s.replace(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu, (e)=>{
      return `<span class="emoji">${e}</span>`
    })
    return s.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, function(m) {      
    return m.link(m)
        .replace(/(?:https?|ftp):\/\/+/g, '')
        .replace('a href="', 'a target="_blank" href="//')
        .replace(/a target="_blank" href="\/\/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])"?/gi,`a href="mailto:${m}"`)
    });
  };

 

  transform(value: unknown, ...args: unknown[]): unknown {  
      
    return this.linkify(value || '',this.userService.User?.username);
  }

}
