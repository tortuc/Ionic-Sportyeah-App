import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mentions'
})
export class MentionsPipe implements PipeTransform {

  mentions(s:string){

    // s.replace()

  }

  transform(value: unknown, ...args: unknown[]): unknown {
 
    
    return value;
  }

}
