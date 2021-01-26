import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsPostPage } from './options-post.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsPostPageRoutingModule {}
