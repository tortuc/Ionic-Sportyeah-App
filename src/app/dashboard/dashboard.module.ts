import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { NewPostPage } from './new-post/new-post.page';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor'
import { DirectivesModule } from '../directives/directive.module';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { PostComponetsModule } from '../post-components/post-componets.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslateModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    EmojiModule,
    PickerModule,
    PipesModule,
    ComponentsModule,
    ContenteditableValueAccessorModule,
    DirectivesModule,
    IonCustomScrollbarModule,
    ComponentsSharedModule,
    PostComponetsModule
  ],
  declarations: [
    DashboardPage
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
