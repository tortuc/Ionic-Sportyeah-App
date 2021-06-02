import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreamUserPageRoutingModule } from './stream-user-routing.module';

import { StreamUserPage } from './stream-user.page';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWigModule } from 'ngx-wig';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { StreamHostComponent } from './stream-host/stream-host.component';
import { StreamClientComponent } from './stream-client/stream-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreamUserPageRoutingModule,
    ComponentsSharedModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxWigModule,
    HttpClientModule,
    TranslateModule,
    PipesModule,
    ComponentsModule, 
    ContenteditableValueAccessorModule,
    EmojiModule,
    PickerModule,
  ],
  declarations: [
    StreamUserPage,
    StreamHostComponent,
    StreamClientComponent
  ]
})
export class StreamUserPageModule {}
