import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewChatComponent } from './new-chat/new-chat.component';
import { TranslateModule } from '@ngx-translate/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { OptionsMsgComponent } from './options-msg/options-msg.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    PickerModule,
    EmojiModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [ChatPage,NewChatComponent,OptionsMsgComponent]
})
export class ChatPageModule {}
