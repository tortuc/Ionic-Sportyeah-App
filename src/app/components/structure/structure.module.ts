import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateStructureComponent } from "./private-structure/private-structure.component";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditStructureInfoComponent } from "./private-structure/edit-structure-info/edit-structure-info.component";
import { PrivateStructurePreviewComponent } from "./private-structure/private-structure-preview/private-structure-preview.component";
import { ComponentsSharedModule } from "src/app/shared-components/components-shared.module";
import { PrivateOrganizationChartComponent } from "./private-organization-chart/private-organization-chart.component";
import { ComponentsModule } from "../components.module";
import { CreateProfileOrgComponent } from "./private-organization-chart/create-profile-org/create-profile-org.component";
import { ExecutiveCardComponent } from "./private-organization-chart/executive-card/executive-card.component";
import { ExecutiveProfileComponent } from "./private-organization-chart/executive-profile/executive-profile.component";
import { PublicStructureComponent } from "./public-structure/public-structure.component";
import { PublicStructurePreviewComponent } from "./public-structure/public-structure-preview/public-structure-preview.component";
import { PublicOrganizationChartComponent } from "./public-organization-chart/public-organization-chart.component";
import { PrivateStructureClubComponent } from "./private-structure-club/private-structure-club.component";
import { CreateDivisionComponent } from "./private-structure-club/create-division/create-division.component";
import { DivisionCardComponent } from "./private-structure-club/division-card/division-card.component";
import { DivisionOptionsComponent } from "./private-structure-club/division-card/division-options/division-options.component";
import { DivisionComponent } from "./division/division.component";
import { CategoryCardComponent } from "./division/category-card/category-card.component";
import { CreateCategoryComponent } from "./division/create-category/create-category.component";
import { PopoverOptionsComponent } from "./popover-options/popover-options.component";
import { TeamCardComponent } from "./category/team-card/team-card.component";
import { CategoryComponent } from "./category/category.component";
import { CreateTeamComponent } from "./category/create-team/create-team.component";
import { TeamComponent } from "./team/team.component";
import { PlayerCardComponent } from "./team/player-card/player-card.component";
import { CreatePlayerComponent } from "./team/player-card/create-player/create-player.component";
import { PlayerComponent } from "./player/player.component";
import { PublicStructureClubComponent } from "./public-structure-club/public-structure-club.component";
import { PublicDivisionComponent } from "./public-division/public-division.component";
import { PublicCategoryComponent } from "./public-category/public-category.component";
import { PublicTeamComponent } from "./public-team/public-team.component";

const components = [
  PrivateStructureComponent,
  EditStructureInfoComponent,
  PrivateStructurePreviewComponent,
  PrivateOrganizationChartComponent,
  CreateProfileOrgComponent,
  ExecutiveCardComponent,
  ExecutiveProfileComponent,
  PublicStructureComponent,
  PublicStructurePreviewComponent,
  PublicOrganizationChartComponent,
  PrivateStructureClubComponent,
  CreateDivisionComponent,
  DivisionCardComponent,
  DivisionOptionsComponent,
  DivisionComponent,
  CategoryCardComponent,
  CreateCategoryComponent,
  PopoverOptionsComponent,
  TeamCardComponent,
  CategoryComponent,
  CreateTeamComponent,
  TeamComponent,
  PlayerCardComponent,
  CreatePlayerComponent,
  PlayerComponent,
  PublicStructureClubComponent,
  PublicDivisionComponent,
  PublicCategoryComponent,
  PublicTeamComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsSharedModule,
    ComponentsModule,
  ],
  exports: components,
})
export class StructureModule {}
