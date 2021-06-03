import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { SportSelectComponent } from './sport-select/sport-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    TranslateModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ComponentsSharedModule
    
  ],
  declarations: [SignupPage,SportSelectComponent]
})
export class SignupPageModule {}
