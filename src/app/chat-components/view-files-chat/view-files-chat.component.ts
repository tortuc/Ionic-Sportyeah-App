import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IFile } from 'src/app/models/iPost';
import { ViewFilesChatSliderComponent } from '../view-files-chat-slider/view-files-chat-slider.component';

@Component({
  selector: 'view-files-chat',
  templateUrl: './view-files-chat.component.html',
  styleUrls: ['./view-files-chat.component.scss'],
})
export class ViewFilesChatComponent implements OnInit {

  @Input() files:IFile[] = []

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  async seeFiles(i){
    let modal = await this.modalCtrl.create({
      component:ViewFilesChatSliderComponent,
      componentProps:{files:this.files}
    })
    modal.present()
  }

  download(file){
    window.location.href = file.url;
  }

}
