import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shared",
})
export class SharedPipe implements PipeTransform {
  transform(shareds: any[], id: string): string {
    let mine = shareds.find((item) => {
      return item.user._id == id;
    });
    return mine ? "ishared" : "";
  }
}
