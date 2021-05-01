import {
  Component,
  Input,
  OnInit,

} from "@angular/core";
import { IPost } from "src/app/models/iPost";

@Component({
  selector: "post-options",
  templateUrl: "./post-options.component.html",
  styleUrls: ["./post-options.component.scss"],
})
export class PostOptionsComponent implements OnInit {
  @Input() post: IPost;
  @Input() isPost: boolean = false;
  constructor(
  ) {}
  ngOnInit() {}


}
