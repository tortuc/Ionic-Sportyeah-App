import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-photo-options',
  templateUrl: './profile-photo-options.component.html',
  styleUrls: ['./profile-photo-options.component.scss'],
})
export class ProfilePhotoOptionsComponent implements OnInit {

  constructor(
    private popover:PopoverController,
    public platform:Platform
  ) { }

  ngOnInit() {}

  option(o){
    this.popover.dismiss(o)
  }

}
