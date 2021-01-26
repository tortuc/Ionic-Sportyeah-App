import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { FollowersPage } from './followers/followers.page';
import { FollowingsPage } from './followings/followings.page';
import { WishesPage } from './wishes/wishes.page';

import { CarrouselComponent } from './carrousel/carrousel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [
    UserPage,
    FollowersPage,
    FollowingsPage,
    WishesPage,
    CarrouselComponent,
  ]
})
export class UserPageModule {}
