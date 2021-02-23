import { Component, Input, OnInit } from '@angular/core';
import { IAward } from 'src/app/service/challenge.service';

@Component({
  selector: 'app-awards-list',
  templateUrl: './awards-list.component.html',
  styleUrls: ['./awards-list.component.scss'],
})
export class AwardsListComponent implements OnInit {
  @Input() awards: IAward;
  @Input() creator: boolean = false;

  constructor() { }

  ngOnInit() {}

}
