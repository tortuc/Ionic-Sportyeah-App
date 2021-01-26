import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowersPage } from './followers.page';

const routes: Routes = [
  {
    path: '',
    component: FollowersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowersPageRoutingModule {}
