import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowingsPage } from './followings.page';

const routes: Routes = [
  {
    path: '',
    component: FollowingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowingsPageRoutingModule {}
