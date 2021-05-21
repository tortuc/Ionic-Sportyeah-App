import {
  Component,
  Input,
  OnInit,

} from "@angular/core";
import { IPost } from "src/app/models/iPost";

@Component({
  selector: 'news-option-post',
  templateUrl: './news-option-post.component.html',
  styleUrls: ['./news-option-post.component.scss'],
})
export class NewsOptionPostComponent implements OnInit {
  @Input() news
  @Input() isNews: boolean = true;
  constructor(
  ) {}
  ngOnInit() {
    
  }

}
