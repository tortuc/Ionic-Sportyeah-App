import { Component, Input, OnInit } from '@angular/core';
import { ISponsorInfo } from 'src/app/models/ISponsor';

@Component({
  selector: 'preview-cards-sponsor',
  templateUrl: './preview-cards-sponsor.component.html',
  styleUrls: ['./preview-cards-sponsor.component.scss']
})
export class PreviewCardsSponsorComponent implements OnInit {

  @Input() info:ISponsorInfo;
  constructor() { }

  ngOnInit() {
  }

}
