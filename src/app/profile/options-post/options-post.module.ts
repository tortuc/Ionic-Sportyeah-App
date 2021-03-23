import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsPostPageRoutingModule } from './options-post-routing.module';

import { OptionsPostPage } from './options-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsPostPageRoutingModule
  ],
  declarations: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class OptionsPostPageModule {}
