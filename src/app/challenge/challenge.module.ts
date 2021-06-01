import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from "src/app/pipes/pipes.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChallengePageRoutingModule } from "./challenge-routing.module";
import { ChallengePage } from "./challenge.page";
import { ComponentsModule } from "../components/components.module";
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';
import { AwardModule } from "../components/award/award.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallengePageRoutingModule,
    TranslateModule,
    ComponentsModule,
    PipesModule,
    IonCustomScrollbarModule,
  ],
  declarations: [
    ChallengePage
  ],
})
export class ChallengePageModule {}
