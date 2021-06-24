import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
})
export class PreviewCardComponent implements OnInit {

  @Input() file;
  @Input() title:string;
  @Input() description:string;
  @Input() colorTitle:string;
  @Input() colorDescription:string;

  constructor() { }

  ngOnInit() {}
  
}
