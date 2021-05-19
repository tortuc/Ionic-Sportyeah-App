import { Component, Input, OnInit } from '@angular/core';
import { ISponsorInfo } from 'src/app/models/ISponsor';

@Component({
  selector: 'view-sponsor-profile',
  templateUrl: './view-sponsor-profile.component.html',
  styleUrls: ['./view-sponsor-profile.component.scss']
})
export class ViewSponsorProfileComponent implements OnInit {

  @Input() info:ISponsorInfo;

  constructor() { }

  ngOnInit() {
  }

}
