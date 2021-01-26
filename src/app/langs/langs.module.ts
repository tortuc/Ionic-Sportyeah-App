import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LangsPageRoutingModule } from './langs-routing.module';

import { LangsPage } from './langs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LangsPageRoutingModule,
    TranslateModule
  ],
  declarations: []
})
export class LangsPageModule {}
