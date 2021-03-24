import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeSliderPage } from './change-slider.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeSliderPageRoutingModule {}
