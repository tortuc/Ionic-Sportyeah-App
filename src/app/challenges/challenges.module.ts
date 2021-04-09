import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "./../pipes/pipes.module";
import { ComponentsModule } from "./../components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChallengesPageRoutingModule } from "./challenges-routing.module";
import { ChallengesPage } from "./challenges.page";
import { ScrollbarDirective } from "ion-custom-scrollbar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallengesPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    PipesModule,
  ],
  declarations: [
    ChallengesPage
  ],
})
export class ChallengesPageModule {}
