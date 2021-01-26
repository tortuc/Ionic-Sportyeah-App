import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ){

  }
  er = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/

  transform(value: string, ...args: unknown[]): unknown {

    try {
      if(value.match(this.er) != null){
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${value.match(this.er)[5]}`);
  
      }else{
  
        return false;
      }
    } catch (error) {
      return false;
    }
    
  }

}
