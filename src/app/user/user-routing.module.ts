import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'wishes',
    loadChildren: () => import('./wishes/wishes.module').then( m => m.WishesPageModule)
  },
  // {
  //   path: 'followers',
  //   loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule)
  // },
  // {
  //   path: 'followings',
  //   loadChildren: () => import('./followings/followings.module').then( m => m.FollowingsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
