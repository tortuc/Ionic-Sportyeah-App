import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sponsor-options',
  templateUrl: './sponsor-options.component.html',
  styleUrls: ['./sponsor-options.component.scss']
})
export class SponsorOptionsComponent implements OnInit {

  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  option(o){
    this.popover.dismiss(o)
  }

}
