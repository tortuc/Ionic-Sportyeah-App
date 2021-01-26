import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPostPageRoutingModule } from './new-post-routing.module';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    NewPostPageRoutingModule 
  ],
  declarations: [
    
  ]
})
export class NewPostPageModule {}
