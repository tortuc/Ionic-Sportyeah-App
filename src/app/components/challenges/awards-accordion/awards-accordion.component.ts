import { IAward } from './../../../service/challenge.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-awards-accordion',
  templateUrl: './awards-accordion.component.html',
  styleUrls: ['./awards-accordion.component.scss'],
})
export class AwardsAccordionComponent implements OnInit {
  @Input() a: IAward;
  @Input() i:number;
  @Input() creator: boolean = false;
  @Output() delete = new EventEmitter<any>();
  open:boolean = false;

  constructor() { }

  ngOnInit() {}

}
