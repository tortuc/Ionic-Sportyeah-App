import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivescoreComponent } from './livescore.component';
import { ScoresResolver, PastMatchesResolver, FixturesResolver } from '../resolvers';

const LIVESCORE_ROUTES: Routes = [
  {
    path: '',
    component: LivescoreComponent,
    resolve: {
      scores: ScoresResolver,
      pastMatches: PastMatchesResolver,
      fixtures: FixturesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(LIVESCORE_ROUTES)],
  exports: [RouterModule],
})
export class LivescoreRoutingModule { }
