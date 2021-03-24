import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NewAwardsPageRoutingModule } from './new-awards-routing.module';
import { NewAwardsPage } from './new-awards.page';
import { PipesModule } from './../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    NewAwardsPageRoutingModule,
    PipesModule
  ],
  declarations: [NewAwardsPage]
})
export class NewAwardsPageModule {}
