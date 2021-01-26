import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-post',
  templateUrl: './options-post.page.html',
  styleUrls: ['./options-post.page.scss'],
})
export class OptionsPostPage implements OnInit {
  @Input () post:any
  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {    
  }

  delete(){
    this.popover.dismiss({
      action:"delete",
      post:this.post
    })
  }


  edit(){
    this.popover.dismiss({
      action:"edit",
      post:this.post
    })
  }

  close(){
    this.popover.dismiss({
      action:"close"
    })
  }
}
