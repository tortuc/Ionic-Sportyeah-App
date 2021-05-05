import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatPageRoutingModule } from "./chat-routing.module";
import { ChatPage } from "./chat.page";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { ComponentsModule } from "../components/components.module";
import { PipesModule } from "../pipes/pipes.module";
import { ChatComponetsModule } from "../chat-components/chat-componets.module";

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
    ComponentsModule,
    ChatComponetsModule
  ],
  declarations: [ChatPage],
})
export class ChatPageModule {}
