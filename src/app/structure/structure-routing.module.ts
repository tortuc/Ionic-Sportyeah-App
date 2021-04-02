import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructurePage } from './structure.page';

const routes: Routes = [
  {
    path: '',
    component: StructurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructurePageRoutingModule {}
