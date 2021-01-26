import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-langs',
  templateUrl: './langs.page.html',
  styleUrls: ['./langs.page.scss'],
})
export class LangsPage implements OnInit {

  constructor(
    private popover:PopoverController,
    private trasnlate:TranslateService
  ) { }

  ngOnInit() {
  }

  langs = []
  ionViewWillEnter(){
    this.langs = this.trasnlate.getLangs()
  }

  use(lang){
    this.trasnlate.use(lang)
    this.popover.dismiss()
  }
  close(){
    this.popover.dismiss()
  }

}
