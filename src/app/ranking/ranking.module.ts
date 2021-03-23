import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPageRoutingModule } from './ranking-routing.module';

import { RankingPage } from './ranking.page';
import { TranslateModule } from '@ngx-translate/core';
import { RankingTodayComponent } from './ranking-today/ranking-today.component';
import { RankingWeekComponent } from './ranking-week/ranking-week.component';
import { RankingMonthComponent } from './ranking-month/ranking-month.component';
import { RakingYearComponent } from './raking-year/raking-year.component';
import { RankingSinceEverComponent } from './ranking-since-ever/ranking-since-ever.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    RankingPage,
    RankingTodayComponent,
    RankingWeekComponent,
    RankingMonthComponent,
    RakingYearComponent,
    RankingSinceEverComponent
  ]
})
export class RankingPageModule {}
