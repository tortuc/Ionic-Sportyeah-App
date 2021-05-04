import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetPage } from './bet.page';

const routes: Routes = [
  {
    path: '',
    component: BetPage
  },
  {
    path: 'billy',
    loadChildren: () => import('./billy/billy.module').then( m => m.BillyPageModule)
  },
  {
    path: 'tourney',
    loadChildren: () => import('./tourney/tourney.module').then( m => m.TourneyPageModule)
  }
];

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class BetPageRoutingModule {}
