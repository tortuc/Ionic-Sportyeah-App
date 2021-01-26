import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';
import { ChangeComponent } from '../change/change.component';

import { AnaliticsViewsComponent } from 'src/app/components/analitics-views/analitics-views.component'

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'analytics-views',
    component: AnaliticsViewsComponent
  },
  {path: 'edit',
    component: ChangeComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
