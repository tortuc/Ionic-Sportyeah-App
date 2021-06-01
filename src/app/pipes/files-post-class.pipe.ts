import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from '../models/iPost';

@Pipe({
  name: 'filesPostClass'
})
export class FilesPostClassPipe implements PipeTransform {

  transform(files: IFile[], ...args: unknown[]): unknown {
    switch (true) {
      case (files.length == 1):
        return ''
        break;
      case (files.length == 2):
        return "file-content-two"
      case (files.length == 3):
        return "file-content-three"
      case (files.length >= 4):
        return "file-content"
      default:
        break;
    }
  }

}
