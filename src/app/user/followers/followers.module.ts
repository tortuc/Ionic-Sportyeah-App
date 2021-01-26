import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowersPageRoutingModule } from './followers-routing.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowersPageRoutingModule,
    TranslateModule
  ],
  declarations: []
})
export class FollowersPageModule {}
