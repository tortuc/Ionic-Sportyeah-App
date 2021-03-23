import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishesPageRoutingModule } from './wishes-routing.module';

import { WishesPage } from './wishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishesPageRoutingModule
  ],
  declarations: []
})
export class WishesPageModule {}
