import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLeaguePageRoutingModule } from './modal-league-routing.module';

import { ModalLeaguePage } from './modal-league.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLeaguePageRoutingModule
  ],
  declarations: [ModalLeaguePage]
})
export class ModalLeaguePageModule {}
