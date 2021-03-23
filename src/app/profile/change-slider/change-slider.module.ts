import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChangeSliderPageRoutingModule } from './change-slider-routing.module';
import { ChangeSliderPage } from './change-slider.page';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeSliderPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ChangeSliderPage]
})
export class ChangeSliderPageModule {}
