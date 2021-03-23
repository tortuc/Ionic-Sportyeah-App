import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment'
@Pipe({
  name: 'customDisplayDate'
})
export class CustomDisplayDatePipe implements PipeTransform {
  constructor(
    private translate:TranslateService
  ){}

  transform(value: Date, utc:boolean = false): unknown {
    let date = moment(value)
    if(utc){
      return `${date.utc().date()} ${this.translate.instant(`months.${date.utc().month()}`)}, ${date.utc().year()}`;

    }else{

      return `${date.date()} ${this.translate.instant(`months.${date.month()}`)}, ${date.year()} ${date.format('HH:mm')}`;
    }
  }

}
