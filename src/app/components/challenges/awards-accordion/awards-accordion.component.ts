import { IAward } from './../../../service/challenge.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards-accordion',
  templateUrl: './awards-accordion.component.html',
  styleUrls: ['./awards-accordion.component.scss'],
})
export class AwardsAccordionComponent implements OnInit {
  @Input() a: IAward;
  @Input() creator: boolean = false;
  open:boolean = false;

  constructor() { }

  ngOnInit() {}

}
