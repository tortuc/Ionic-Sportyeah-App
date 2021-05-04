import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourneyPage } from './tourney.page';

const routes: Routes = [
  {
    path: '',
    component: TourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourneyPageRoutingModule {}
