import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationGroupComponent } from './invitation-group.component';

const routes: Routes = [
  {
    path: '',
    component: InvitationGroupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationGroupRoutingModule { }
