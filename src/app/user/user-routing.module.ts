import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicGalleryComponent } from "../components/gallery/public-gallery/public-gallery.component";
import { PrivateOrganizationChartComponent } from "../components/structure/private-organization-chart/private-organization-chart.component";
import { PublicOrganizationChartComponent } from "../components/structure/public-organization-chart/public-organization-chart.component";
import { PublicStructureClubComponent } from "../components/structure/public-structure-club/public-structure-club.component";
import { PublicStructureComponent } from "../components/structure/public-structure/public-structure.component";

import { UserPage } from "./user.page";

const routes: Routes = [
  {
    path: "",
    component: UserPage,
  },
  {
    path:"gallery",
    component:PublicGalleryComponent
  },
  {
    path:"structure",
    component:PublicStructureComponent
  },
  {
    path: "structure/organization",
    component: PublicOrganizationChartComponent
  },
  {
    path: "structure/club",
    component: PublicStructureClubComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
