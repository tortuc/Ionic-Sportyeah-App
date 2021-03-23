import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IChallenge } from '../../../service/challenge.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenges-post',
  templateUrl: './challenges-post.component.html',
  styleUrls: ['./challenges-post.component.scss'],
})
export class ChallengesPostComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  pause: Subject<void> = new Subject();

  constructor(public router: Router) { }

  ngOnInit() {}

}
