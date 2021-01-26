import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'url-preview',
  templateUrl: './url-preview.component.html',
  styleUrls: ['./url-preview.component.scss'],
})
export class UrlPreviewComponent implements OnInit {

  @Input() preview: any

  constructor() { }

  ngOnInit() {}

}
