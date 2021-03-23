import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowerPageRoutingModule } from './follower-routing.module';

import { FollowerPage } from './follower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowerPageRoutingModule
  ],
  declarations: []
})
export class FollowerPageModule {}
