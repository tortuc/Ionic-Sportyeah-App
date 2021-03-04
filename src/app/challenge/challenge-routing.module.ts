import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengePage } from './challenge.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengePageRoutingModule {}
