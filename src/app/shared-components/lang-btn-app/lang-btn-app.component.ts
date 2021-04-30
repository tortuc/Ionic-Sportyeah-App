import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from 'src/app/langs/langs.page';

@Component({
  selector: 'lang-btn-app',
  templateUrl: './lang-btn-app.component.html',
  styleUrls: ['./lang-btn-app.component.scss'],
})
export class LangBtnAppComponent implements OnInit {

  constructor(
    public popover:PopoverController,
    public translate:TranslateService
  ) { }

  ngOnInit() {}


  async langs(ev) {
    let langs = await this.popover.create({
      component: LangsPage,
      translucent: true,
      event: ev,
    });

    langs.present();
  }


}
