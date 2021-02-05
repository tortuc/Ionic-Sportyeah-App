import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { NewsPage } from './news.page';
import { ReadComponent } from './read/read.component'
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'read/:id',
    component: ReadComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
