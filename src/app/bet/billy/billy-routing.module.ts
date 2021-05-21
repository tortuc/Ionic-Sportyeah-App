import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillyPage } from './billy.page';

const routes: Routes = [
  {
    path: '',
    component: BillyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillyPageRoutingModule {}
