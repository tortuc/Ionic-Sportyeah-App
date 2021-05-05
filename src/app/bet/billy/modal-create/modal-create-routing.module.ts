import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCreatePage } from './modal-create.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCreatePageRoutingModule {}
