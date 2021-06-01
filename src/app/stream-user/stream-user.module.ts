import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreamUserPageRoutingModule } from './stream-user-routing.module';

import { StreamUserPage } from './stream-user.page';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreamUserPageRoutingModule,
    ComponentsSharedModule,
    TranslateModule
  ],
  declarations: [StreamUserPage]
})
export class StreamUserPageModule {}
