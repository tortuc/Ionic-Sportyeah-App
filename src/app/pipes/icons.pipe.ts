import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icons'
})
export class IconsPipe implements PipeTransform {

  icons(s) {
    return s.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi, function(m) {  
      return(m)
    // return `<ngx-emoji emoji="${m.codePointAt(0).toString(16)}" size="24"></ngx-emoji>`
    
  });
  };


  transform(value: unknown, ...args: unknown[]): unknown {
    return this.icons(value);
  }

}
