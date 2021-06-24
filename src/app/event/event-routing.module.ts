import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

import { EventPage } from './event.page';
import { ReadEventComponent } from './read-event/read-event.component';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  },
  {
    path: 'create',
    component: CreateEventComponent
  },
  {
    path: 'edit/:id',
    component: EditEventComponent
  },
  {
    path: 'read/:id',
    component: ReadEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
