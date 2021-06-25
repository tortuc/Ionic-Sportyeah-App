import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/iPost';

@Component({
  selector: 'comment-options',
  templateUrl: './comment-options.component.html',
  styleUrls: ['./comment-options.component.scss']
})
export class CommentOptionsComponent implements OnInit {

  @Input() comment:IComment;

  constructor() { }

  ngOnInit() {
  }



}
