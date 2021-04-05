import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewPostPage } from './new-post/new-post.page';
import { AddFriendsPage } from './add-friends/add-friends.page';
import { LangsPage } from '../langs/langs.page';
import { LikedPipe } from '../pipes/liked.pipe';
import { LinksPipe } from '../pipes/links.pipe';
import { NewCommentComponent } from '../post/new-comment/new-comment.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { MentionsDirective } from '../directives/mentions.directive';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor'
import { DirectivesModule } from '../directives/directive.module';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';

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
  ],
  declarations: [
    DashboardPage,
    NewPostPage,
    NewCommentComponent
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
