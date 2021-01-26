import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { NewAptitudesPageRoutingModule } from './new-aptitudes-routing.module';

import { NewAptitudesPage } from './new-aptitudes.page';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    IonicRatingModule,
    NewAptitudesPageRoutingModule
  ],
  declarations: [NewAptitudesPage]
})
export class NewAptitudesPageModule {}
