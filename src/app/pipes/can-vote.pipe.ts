import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canVote'
})
export class CanVotePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
