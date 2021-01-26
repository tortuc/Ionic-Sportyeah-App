import { Component, OnInit, Input } from '@angular/core';
import { LandingService } from 'src/app/service/landingService';

@Component({
  selector: 'app-optional-box',
  templateUrl: './optional-box.component.html',
  styleUrls: ['./optional-box.component.scss'],
})
export class OptionalBoxComponent implements OnInit {

  @Input() changeText: (name:string) => void; 
  @Input() modalController: any; 
  @Input() creator: boolean; 
  constructor(
    public ls: LandingService,
    public landingService: LandingService,
  ) { }

  ngOnInit() {}

}
