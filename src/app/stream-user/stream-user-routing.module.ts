import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamClientComponent } from './stream-client/stream-client.component';
import { StreamHostComponent } from './stream-host/stream-host.component';

import { StreamUserPage } from './stream-user.page';

const routes: Routes = [
  {
    path: '',
    component: StreamUserPage
  },
  {
    path: 'host/:id',
    component: StreamHostComponent
  },
  {
    path: 'client/:id',
    component: StreamClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamUserPageRoutingModule {}
