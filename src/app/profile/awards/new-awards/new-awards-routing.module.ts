import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAwardsPage } from './new-awards.page';

const routes: Routes = [
  {
    path: '',
    component: NewAwardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAwardsPageRoutingModule {}
