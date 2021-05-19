import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { NewsPage } from './news.page';
import { ReadComponent } from './read/read.component'
import { EditComponent } from './edit/edit.component';
import { StreamComponent } from './stream/stream.component';
import { CreateStreamComponent } from './create-stream/create-stream.component';
import { LandingGuard } from 'src/app/guards/landing-guard.service';

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
    component: ReadComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'streamNews/:id',
    component: StreamComponent
  },
  {
    path: 'createStream/:id',
    component: CreateStreamComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
