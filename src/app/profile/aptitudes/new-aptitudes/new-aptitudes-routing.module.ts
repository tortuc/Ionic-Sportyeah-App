import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAptitudesPage } from './new-aptitudes.page';

const routes: Routes = [
  {
    path: '',
    component: NewAptitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAptitudesPageRoutingModule {}
