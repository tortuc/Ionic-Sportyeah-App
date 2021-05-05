import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-share-popover',
  templateUrl: './share-popover.component.html',
  styleUrls: ['./share-popover.component.scss'],
})
export class SharePopoverComponent implements OnInit {

  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  option(o){
    this.popover.dismiss(o)
  }
}
