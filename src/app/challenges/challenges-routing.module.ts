import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChallengesPage } from "./challenges.page";

const routes: Routes = [
  {
    path: "",
    component: ChallengesPage,
  },  {
    path: 'profile-challenge',
    loadChildren: () => import('./profile-challenge/profile-challenge.module').then( m => m.ProfileChallengePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengesPageRoutingModule {}
