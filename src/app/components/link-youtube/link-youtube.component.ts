import { ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-youtube',
  templateUrl: './link-youtube.component.html',
  styleUrls: ['./link-youtube.component.scss'],
})
export class LinkYoutubeComponent implements OnInit {

  constructor(
    public translate: TranslateModule,
    public modalCtrl: ModalController,
  ) { }
  link:string;

  ngOnInit() {}
  
  addContent(){
    this.modalCtrl.dismiss(this.link);
  }
}
