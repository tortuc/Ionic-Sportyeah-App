import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { NewsPage } from './news.page';
import { ReadComponent } from './read/read.component'
import { EditComponent } from './edit/edit.component';
import { StreamNewsComponent } from './stream-news/stream-news.component';
import { LandingGuard } from 'src/app/guards/landing-guard.service';
import { ProfileNewsComponent } from './profile-news/profile-news.component';
import { CreateStreamNewsComponent } from './create-stream-news/create-stream-news.component'
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
    component: StreamNewsComponent
  },
  {
    path: 'createStream/:id',
    component: CreateStreamNewsComponent
  },
  {
    path: 'profileNews',
    component: ProfileNewsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
