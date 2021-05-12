import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';
import { ProfileEditPage } from './profile-edit.page';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ComponentsSharedModule } from 'src/app/shared-components/components-shared.module';
import { ChangeFlagComponent } from './change-flag/change-flag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsSharedModule,
    ComponentsModule,
    EmojiModule,
    PickerModule
    
  ],
  declarations: [ProfileEditPage,AvatarComponent,ChangeFlagComponent]
})
export class ProfileEditPageModule {}
