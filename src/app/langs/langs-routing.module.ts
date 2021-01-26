import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LangsPage } from './langs.page';

const routes: Routes = [
  {
    path: '',
    component: LangsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LangsPageRoutingModule {}
