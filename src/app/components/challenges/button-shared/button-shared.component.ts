import { IChallenge } from './../../../service/challenge.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss'],
})
export class ButtonSharedComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor() { }

  ngOnInit() {}

}
