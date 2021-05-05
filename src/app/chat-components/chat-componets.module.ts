import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DirectivesModule } from "src/app/directives/directive.module";
import { RouterModule } from "@angular/router";
import { NewChatComponent } from "../chat/new-chat/new-chat.component";
import { OptionsMsgComponent } from "../chat/options-msg/options-msg.component";
import { ChatInfoGroupComponent } from "./chat-info-group/chat-info-group.component";
import { ChatNewGroupComponent } from "./chat-new-group/chat-new-group.component";
import { ChatOptionsComponent } from "./chat-options/chat-options.component";
import { ChatUserItemComponent } from "./chat-user-item/chat-user-item.component";
import { ChatPendingUsersComponent } from "./chat-pending-users/chat-pending-users.component";
import { GroupOptionUsersComponent } from "./group-option-users/group-option-users.component";
import { GroupImageComponent } from "./group-image/group-image.component";
import { GroupNameComponent } from "./group-name/group-name.component";
import { GroupAddUsersComponent } from "./group-add-users/group-add-users.component";
import { ChatBoxComponent } from "./chat-box/chat-box.component";
import { ChatBoxMessageZoneComponent } from "./chat-box-message-zone/chat-box-message-zone.component";
import { ChatEmptyComponent } from "./chat-empty/chat-empty.component";
import { PreviewFilesChatComponent } from "./preview-files-chat/preview-files-chat.component";
import { RecordAudioComponent } from "./record-audio/record-audio.component";
import { ViewFilesChatComponent } from "./view-files-chat/view-files-chat.component";
import { ViewFilesChatSliderComponent } from "./view-files-chat-slider/view-files-chat-slider.component";
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { MessageBasicComponent } from "./message-basic/message-basic.component";
import { MsgAudioComponent } from "./msg-audio/msg-audio.component";
import { ChatboxOptionsComponent } from "./chatbox-options/chatbox-options.component";

const componets = [
  NewChatComponent,
  OptionsMsgComponent,
  ChatInfoGroupComponent,
  ChatNewGroupComponent,
  ChatOptionsComponent,
  ChatUserItemComponent,
  ChatPendingUsersComponent,
  GroupOptionUsersComponent,
  GroupImageComponent,
  GroupNameComponent,
  GroupAddUsersComponent,
  ChatBoxComponent,
  ChatBoxMessageZoneComponent,
  ChatEmptyComponent,
  PreviewFilesChatComponent,
  RecordAudioComponent,
  ViewFilesChatComponent,
  ViewFilesChatSliderComponent,
  ChatHeaderComponent,
  MessageBasicComponent,
  MsgAudioComponent,
  ChatboxOptionsComponent
];

@NgModule({
  declarations: componets,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ContenteditableValueAccessorModule,
    EmojiModule,
    PickerModule,
    DirectivesModule,
    RouterModule,
  ],
  exports: componets,
})
export class ChatComponetsModule {}
