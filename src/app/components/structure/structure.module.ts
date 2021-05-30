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

const components = [
  PrivateStructureComponent,
  EditStructureInfoComponent,
  PrivateStructurePreviewComponent,
  PrivateOrganizationChartComponent,
  CreateProfileOrgComponent,
  ExecutiveCardComponent,
  ExecutiveProfileComponent
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
    ComponentsModule
  ],
  exports: components,
})
export class StructureModule {}
