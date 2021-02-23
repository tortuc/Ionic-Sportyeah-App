import { IChallenge } from '../../../service/challenge.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenges-post',
  templateUrl: './challenges-post.component.html',
  styleUrls: ['./challenges-post.component.scss'],
})
export class ChallengesPostComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor() { }

  ngOnInit() {}

}
