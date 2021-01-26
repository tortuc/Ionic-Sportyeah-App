import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowingsPageRoutingModule } from './followings-routing.module';

import { FollowingsPage } from './followings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowingsPageRoutingModule
  ],
  declarations: []
})
export class FollowingsPageModule {}
