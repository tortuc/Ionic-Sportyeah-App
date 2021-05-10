import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivescoreComponent } from './livescore.component';

const LIVESCORE_ROUTES: Routes = [
  {
    path: '',
    component: LivescoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(LIVESCORE_ROUTES)],
  exports: [RouterModule],
})
export class LivescoreRoutingModule { }
