import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directive.module';
import { SelectCurrencyComponent } from './select-currency/select-currency.component';
import { InviteEventComponent } from './create-event/invite-event/invite-event.component';
import { PreviewCardComponent } from './create-event/preview-card/preview-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxWigModule } from 'ngx-wig';
import { ComponentsModule } from '../components/components.module';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ShowEventsComponent } from './show-events/show-events.component';
import { ReadEventComponent } from './read-event/read-event.component';
import { WillEventAttendComponent } from './will-event-attend/will-event-attend.component';
import { OptionEventComponent } from './option-event/option-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventAddUserComponent } from './create-event/event-add-user/event-add-user.component';
import { UsersEventItemComponent } from './create-event/users-event-item/users-event-item.component';
import { SeeAllUsersLandingComponent } from './create-event/see-all-users-landing/see-all-users-landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    ComponentsSharedModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    DirectivesModule,
    NgxWigModule,
    HttpClientModule,
    ComponentsModule,
    ContenteditableValueAccessorModule,
    PickerModule,
  ],
  declarations: [
    EventPage,
    CreateEventComponent,
    SelectCurrencyComponent,
    InviteEventComponent,
    PreviewCardComponent,
    ShowEventsComponent,
    ReadEventComponent,
    WillEventAttendComponent,
    OptionEventComponent,
    EditEventComponent,
    EventAddUserComponent,
    UsersEventItemComponent,
    SeeAllUsersLandingComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class EventPageModule {}
