import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

import { CarrouselComponent } from './carrousel/carrousel.component';
import { PostComponetsModule } from '../post-components/post-componets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule,
    PostComponetsModule
  ],
  declarations: [
    UserPage,
    CarrouselComponent,
  ]
})
export class UserPageModule {}
