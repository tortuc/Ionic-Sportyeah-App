import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPostPage } from './edit-post.page';

const routes: Routes = [
  {
    path: '',
    component: EditPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostPageRoutingModule {}
