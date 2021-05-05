import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillyPageRoutingModule } from './billy-routing.module';

import { BillyPage } from './billy.page';
import { ModalCreatePage } from './modal-create/modal-create.page';
import { ModalCreatePageModule } from './modal-create/modal-create.module';

@NgModule({
  entryComponents: [
    ModalCreatePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillyPageRoutingModule,
    ModalCreatePageModule
  ],
  declarations: [BillyPage]
})
export class BillyPageModule {}
