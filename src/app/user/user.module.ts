import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserPageRoutingModule } from "./user-routing.module";

import { UserPage } from "./user.page";
import { PipesModule } from "../pipes/pipes.module";
import { ComponentsModule } from "../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

import { CarrouselComponent } from "./carrousel/carrousel.component";
import { PostComponetsModule } from "../post-components/post-componets.module";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { SponsorsModule } from "../sponsors-components/sponsors.module";
import { ExperiencesModule } from "../experiences/experiences.module";
import { AwardModule } from "../components/award/award.module";
import { AptitudesModule } from "../components/aptitudes/aptitudes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule,
    ComponentsSharedModule,
    PostComponetsModule,
    SponsorsModule,
    ExperiencesModule,
    AwardModule,
    AptitudesModule
  ],
  declarations: [UserPage, CarrouselComponent],
})
export class UserPageModule {}
