import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExperiencePage } from './new-experience.page';

const routes: Routes = [
  {
    path: '',
    component: NewExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExperiencePageRoutingModule {}
