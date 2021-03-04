import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IChallenge } from "src/app/service/challenge.service";

@Component({
  selector: 'app-parte-derecha-web',
  templateUrl: './parte-derecha-web.component.html',
  styleUrls: ['./parte-derecha-web.component.scss'],
})
export class ParteDerechaWebComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;

  constructor() { }

  ngOnInit() {}

  goToProfile(xd,dx){}

}
