import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilePage } from "./profile.page";
import { ViewProfileComponent } from "../components/view-profile/view-profile.component";
import { GalleryComponent } from "../components/gallery/gallery/gallery.component";
import { PrivateStructureComponent } from "../components/structure/private-structure/private-structure.component";
import { StructureGuardService } from "../guards/structure-guard.service";
import { PrivateOrganizationChartComponent } from "../components/structure/private-organization-chart/private-organization-chart.component";
import { ExecutiveProfileComponent } from "../components/structure/private-organization-chart/executive-profile/executive-profile.component";
import { LandingGuard } from "../guards/landing-guard.service";
import { PrivateStructureClubComponent } from "../components/structure/private-structure-club/private-structure-club.component";
import { DivisionComponent } from "../components/structure/division/division.component";
const routes: Routes = [
  {
    path: "",
    component: ProfilePage,
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./profile-edit/profile-edit.module").then(
        (m) => m.ProfileEditPageModule
      ),
  },
  {
    path: "gallery",
    component: GalleryComponent,
  },
  {
    path: "structure",
    component: PrivateStructureComponent,
    canActivate: [StructureGuardService],
  },
  {
    path: "structure/organization",
    component: PrivateOrganizationChartComponent,
    canActivate: [StructureGuardService],
  },
  {
    path: "structure/divisions",
    component: PrivateStructureClubComponent,
    canActivate: [StructureGuardService],
  },
  {
    path: "structure/divisions/:id",
    component: DivisionComponent,
    canActivate: [StructureGuardService],
  },

  {
    path: "following",
    loadChildren: () =>
      import("./following/following.module").then((m) => m.FollowingPageModule),
  },
  {
    path: "follower",
    loadChildren: () =>
      import("./follower/follower.module").then((m) => m.FollowerPageModule),
  },

  {
    path: "view-profile",
    component: ViewProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
