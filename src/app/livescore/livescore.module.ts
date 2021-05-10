import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LivescoreRoutingModule } from './livescore-routing.module';
import { LivescoreComponent } from './livescore.component';

@NgModule({
  declarations: [
    LivescoreComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    LivescoreRoutingModule,
  ]
})
export class LivescoreModule { }
