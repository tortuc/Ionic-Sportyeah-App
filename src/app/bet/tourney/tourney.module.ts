import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourneyPageRoutingModule } from './tourney-routing.module';

import { TourneyPage } from './tourney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourneyPageRoutingModule
  ],
  declarations: [TourneyPage]
})
export class TourneyPageModule {}
