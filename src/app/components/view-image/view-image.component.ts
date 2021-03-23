import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss'],
})
export class ViewImageComponent implements OnInit {
  @Input() url:string

  constructor(
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {}

}
