import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCreatePageRoutingModule } from './modal-create-routing.module';

import { ModalCreatePage } from './modal-create.page';
import { ModalLeaguePage } from './modal-league/modal-league.page';
import { ModalLeaguePageModule } from './modal-league/modal-league.module';

@NgModule({
  entryComponents: [
    ModalLeaguePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCreatePageRoutingModule,
    ModalLeaguePageModule
  ],
  declarations: [ModalCreatePage]
})
export class ModalCreatePageModule {}
