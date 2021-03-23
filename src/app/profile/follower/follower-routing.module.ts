import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowerPage } from './follower.page';

const routes: Routes = [
  {
    path: '',
    component: FollowerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowerPageRoutingModule {}
