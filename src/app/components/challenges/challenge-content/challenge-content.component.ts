import { IChallenge } from './../../../service/challenge.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-content',
  templateUrl: './challenge-content.component.html',
  styleUrls: ['./challenge-content.component.scss'],
})
export class ChallengeContentComponent implements OnInit {
  @Input() Challenge: IChallenge

  constructor() { }

  ngOnInit() {}

}
