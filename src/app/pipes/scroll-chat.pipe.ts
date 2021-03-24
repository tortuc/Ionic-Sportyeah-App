import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scrollChat'
})
export class ScrollChatPipe implements PipeTransform {

  transform(value: unknown, scrollTop:number,cd:ChangeDetectorRef): unknown {    
    cd.detectChanges()
    return value;
  }

}
