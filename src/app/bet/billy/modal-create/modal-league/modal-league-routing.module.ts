import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLeaguePage } from './modal-league.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLeaguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLeaguePageRoutingModule {}
