import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-banner-options',
  templateUrl: './profile-banner-options.component.html',
  styleUrls: ['./profile-banner-options.component.scss'],
})
export class ProfileBannerOptionsComponent implements OnInit {

  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  option(o){
    this.popover.dismiss(o)
  }

}
