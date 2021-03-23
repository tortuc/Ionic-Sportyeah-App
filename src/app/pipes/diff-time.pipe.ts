import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'diffTime'
})
export class DiffTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    
    return moment(new Date(value * 1000).toISOString()).format('mm:ss');
  }

}
