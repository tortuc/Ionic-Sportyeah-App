import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFriendsPage } from './add-friends.page';

const routes: Routes = [
  {
    path: '',
    component: AddFriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFriendsPageRoutingModule {}
