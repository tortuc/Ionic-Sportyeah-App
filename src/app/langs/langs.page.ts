import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-langs',
  templateUrl: './langs.page.html',
  styleUrls: ['./langs.page.scss'],
})
export class LangsPage implements OnInit {

  constructor(
    private popover: PopoverController,
    private trasnlate: TranslateService,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  langs = [];
  ionViewWillEnter() {
    this.langs = this.trasnlate.getLangs();
  }

  use(lang) {
    this.trasnlate.use(lang);
    this.cookieService.set("lang", lang, { expires: 1000 * 60 });
    if (this.userService.User) {
      this.userService.update({ lang }).pipe(take(1)).subscribe();
    }
    this.popover.dismiss();
  }
  close() {
    this.popover.dismiss();
  }
}
