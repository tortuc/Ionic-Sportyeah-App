import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamUserPage } from './stream-user.page';

const routes: Routes = [
  {
    path: '',
    component: StreamUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamUserPageRoutingModule {}
