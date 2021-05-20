import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileSponsorsComponent } from "./profile-sponsors/profile-sponsors.component";
import { SponsorsCreateComponent } from "./sponsors-create/sponsors-create.component";
import { SponsorUserItemComponent } from "./sponsors-create/sponsor-user-item/sponsor-user-item.component";
import { SponsorsSearchComponent } from "./sponsors-create/sponsors-search/sponsors-search.component";
import { CustomSponsorComponent } from "./custom-sponsor/custom-sponsor.component";
import { CustomizeSponsorComponent } from "./custom-sponsor/customize-sponsor/customize-sponsor.component";
import { PreviewCardsSponsorComponent } from "./preview-cards-sponsor/preview-cards-sponsor.component";
import { ViewSponsorProfileComponent } from "./profile-sponsors/view-sponsor-profile/view-sponsor-profile.component";
import { AllSponsorsComponent } from "./profile-sponsors/all-sponsors/all-sponsors.component";
import { SponsorOptionsComponent } from "./profile-sponsors/all-sponsors/sponsor-options/sponsor-options.component";
import { EditSponsorComponent } from "./profile-sponsors/all-sponsors/edit-sponsor/edit-sponsor.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { ViewSponsorMiniComponent } from "./view-sponsors/view-sponsor-mini/view-sponsor-mini.component";
import { ViewSponsorsComponent } from "./view-sponsors/view-sponsors.component";

const components = [
  ProfileSponsorsComponent,

  SponsorsCreateComponent,
  SponsorsSearchComponent,
  SponsorUserItemComponent,
  CustomSponsorComponent,
  PreviewCardsSponsorComponent,
  CustomizeSponsorComponent,
  ViewSponsorProfileComponent,
  AllSponsorsComponent,
  SponsorOptionsComponent,
  EditSponsorComponent,
  ViewSponsorMiniComponent,
  ViewSponsorsComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    RouterModule,
  ],
  exports: components,
})
export class SponsorsModule {}
