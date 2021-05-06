import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationGroupRoutingModule } from './invitation-group-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { InvitationGroupComponent } from './invitation-group.component';


@NgModule({
  declarations: [
    InvitationGroupComponent
  ],
  imports: [
    CommonModule,
    InvitationGroupRoutingModule,
    TranslateModule,
    IonicModule
  ]
})
export class InvitationGroupModule { }
