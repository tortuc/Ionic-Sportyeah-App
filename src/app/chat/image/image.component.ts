import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMessage } from 'src/app/models/IChat';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input('msg') msg:IMessage

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    
  }

  dismiss(){
    this.modalCtrl.dismiss({
      action:'closed'
    })
  }
}
