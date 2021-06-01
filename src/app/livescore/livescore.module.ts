import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LivescoreRoutingModule } from './livescore-routing.module';
import { LivescoreComponent } from './livescore.component';
import {  
  LivescoreResumeComponent,
  LivescoreStatisticsComponent,
  LivescoreStandingsComponent
} from '../livescore-components';

const LIVESCORE_COMPONENTS: Type<any>[] = [
  LivescoreResumeComponent,
  LivescoreStatisticsComponent,
  LivescoreStandingsComponent,
];

@NgModule({
  declarations: [
    LivescoreComponent,
    ... LIVESCORE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    IonicModule,
    LivescoreRoutingModule,
  ]
})
export class LivescoreModule { }
