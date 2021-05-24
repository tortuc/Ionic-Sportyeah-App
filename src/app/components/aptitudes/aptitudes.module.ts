import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsSharedModule } from "src/app/shared-components/components-shared.module";
import { ProfileSharedComponentsModule } from "src/app/profile/profile-shared-components/profile-shared-components.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { IonicRatingModule } from "ionic4-rating";
import { CreateAptitudeComponent } from "./create-aptitude/create-aptitude.component";
import { AptitudesPage } from "./aptitudes/aptitudes.page";
import { AptitudeItemComponent } from "./aptitude-item/aptitude-item.component";

const components = [AptitudesPage, CreateAptitudeComponent,AptitudeItemComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
    ComponentsSharedModule,
    ProfileSharedComponentsModule,
    IonicRatingModule,
  ],
  exports: components,
})
export class AptitudesModule {}
