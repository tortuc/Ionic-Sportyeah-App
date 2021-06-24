import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCommentPage } from './edit-comment.page';

const routes: Routes = [
  {
    path: '',
    component: EditCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCommentPageRoutingModule {}
