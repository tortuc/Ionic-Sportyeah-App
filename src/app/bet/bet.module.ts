import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetPageRoutingModule } from './bet-routing.module';

import { BetPage } from './bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetPageRoutingModule
  ],
  declarations: [BetPage]
})
export class BetPageModule {}
