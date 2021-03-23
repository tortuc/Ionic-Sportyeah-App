import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-msg',
  templateUrl: './options-msg.component.html',
  styleUrls: ['./options-msg.component.scss'],
})
export class OptionsMsgComponent implements OnInit {
  @Input('') msg:any
  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  delete(){
    this.popover.dismiss({
      action:"delete",
      msg:this.msg
        })
  }


  edit(){
    this.popover.dismiss({
      action:"edit",
      msg:this.msg
    })
  }

  close(){
    this.popover.dismiss({
      action:"close"
    })
  }

}
