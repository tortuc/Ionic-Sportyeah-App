import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishesPage } from './wishes.page';

const routes: Routes = [
  {
    path: '',
    component: WishesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishesPageRoutingModule {}
