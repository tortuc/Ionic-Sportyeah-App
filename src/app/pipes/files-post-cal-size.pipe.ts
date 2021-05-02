import { Pipe, PipeTransform } from "@angular/core";
import { IPostFile } from "../models/iPost";

@Pipe({
  name: "filesPostCaclSize",
})
export class FilesPostCalSizePipe implements PipeTransform {
  transform(files: IPostFile[], index: number = 0): unknown {
    switch (true) {
      case files.length == 2:
        return 12;
        break;
      case files.length == 3 && index < 2:
        return 6;

      case files.length == 3 && index == 2:
        return 12;

      case files.length >= 4:
        return 6;

      default:
        return 12;
        break;
    }
  }
}
