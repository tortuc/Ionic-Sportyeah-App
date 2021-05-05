import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-options',
  templateUrl: './chat-options.component.html',
  styleUrls: ['./chat-options.component.scss'],
})
export class ChatOptionsComponent implements OnInit {

  constructor(
    private popoverCtrl:PopoverController,
  ) { }

  ngOnInit() {
  }

 

  option(o){
    this.popoverCtrl.dismiss(o)
  }

}
