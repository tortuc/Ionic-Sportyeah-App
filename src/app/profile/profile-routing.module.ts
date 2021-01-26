import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component'
const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./change-slider/change-slider.module').then( m => m.ChangeSliderPageModule)
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then( m => m.FollowingPageModule)
  },
  {
    path: 'follower',
    loadChildren: () => import('./follower/follower.module').then( m => m.FollowerPageModule)
  },
  {
    path: 'new-experience',
    loadChildren: () => import('./experience/new-experience/new-experience.module').then( m => m.NewExperiencePageModule)
  },
  {
    path: 'new-awards',
    loadChildren: () => import('./awards/new-awards/new-awards.module').then( m => m.NewAwardsPageModule)
  },
  {
    path: 'new-aptitudes',
    loadChildren: () => import('./aptitudes/new-aptitudes/new-aptitudes.module').then( m => m.NewAptitudesPageModule)
  },
  {
    path:'view-profile',
    component:ViewProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
