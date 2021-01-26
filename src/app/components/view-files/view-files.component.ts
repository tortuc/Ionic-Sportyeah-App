import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss'],
})
export class ViewFilesComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  
  @Input() files: any[] = []
  @Output() deleted = new EventEmitter()

  download(url){
    window.location.href = url;
  }

  async open(url){
    let modal = await this.modalCtrl.create({
      component:ViewImageComponent,
      componentProps:{url}
    })
    modal.present()
  }
}
 