import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-option-news',
  templateUrl: './option-news.component.html',
  styleUrls: ['./option-news.component.scss'],
})
export class OptionNewsComponent implements OnInit {
  @Input () news:any
  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {    
  }

  delete(){
    this.popover.dismiss({
      action:"delete",
      news:this.news._id
    })
  }


  edit(){
    this.popover.dismiss({
      action:"edit",
      news:this.news._id
    })
  }

  close(){
    this.popover.dismiss({
      action:"close"
    })
  }
}
