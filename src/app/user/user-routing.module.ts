import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicGalleryComponent } from "../components/gallery/public-gallery/public-gallery.component";

import { UserPage } from "./user.page";

const routes: Routes = [
  {
    path: "",
    component: UserPage,
  },
  {
    path:"gallery",
    component:PublicGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
