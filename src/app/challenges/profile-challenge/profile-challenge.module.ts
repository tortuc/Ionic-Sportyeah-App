import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfileChallengePageRoutingModule } from "./profile-challenge-routing.module";

import { ProfileChallengePage } from "./profile-challenge.page";
import { ComponentsModule } from "src/app/components/components.module";
import { PipesModule } from "src/app/pipes/pipes.module";
import { DirectivesModule } from "src/app/directives/directive.module";

@NgModule({
  imports: [
    ProfileChallengePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    PipesModule,
    DirectivesModule,
  ],
  declarations: [ProfileChallengePage],
})
export class ProfileChallengePageModule {}
