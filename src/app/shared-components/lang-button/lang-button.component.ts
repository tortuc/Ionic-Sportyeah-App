import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from 'src/app/langs/langs.page';

@Component({
  selector: 'lang-button',
  templateUrl: './lang-button.component.html',
  styleUrls: ['./lang-button.component.scss'],
})
export class LangButtonComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private popover:PopoverController
  ) { }


  async langs(ev) {
    let langs = await this.popover.create({
      component: LangsPage,
      event: ev,
      translucent: true,
    });

    langs.present();
  }

  ngOnInit() {}

}
