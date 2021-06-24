import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-option-event',
  templateUrl: './option-event.component.html',
  styleUrls: ['./option-event.component.scss'],
})
export class OptionEventComponent implements OnInit {
  @Input () event:any

  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  delete(){
    this.popover.dismiss({
      action:"delete",
      event:this.event._id
    })
  }

  restore(){
    this.popover.dismiss({
      action:"restore",
      event:this.event._id
    })
  }


  edit(){
    this.popover.dismiss({
      action:"edit",
      event:this.event._id
    })
  }

  close(){
    this.popover.dismiss({
      action:"close"
    })
  }

}
