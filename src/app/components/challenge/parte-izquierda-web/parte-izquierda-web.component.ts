import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IChallenge } from "src/app/service/challenge.service";

@Component({
  selector: "app-parte-izquierda-web",
  templateUrl: "./parte-izquierda-web.component.html",
  styleUrls: ["./parte-izquierda-web.component.scss"],
})
export class ParteIzquierdaWebComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  constructor() {}

  ngOnInit() {}
}
