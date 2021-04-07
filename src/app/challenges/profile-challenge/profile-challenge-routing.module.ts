import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileChallengePage } from './profile-challenge.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileChallengePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileChallengePageRoutingModule {}
