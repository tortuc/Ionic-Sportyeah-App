import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { AwardsPage } from "./awards/awards.page";
import { CreateAwardComponent } from "./awards/create-award/create-award.component";
import { ProfileSharedComponentsModule } from "src/app/profile/profile-shared-components/profile-shared-components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsSharedModule } from "src/app/shared-components/components-shared.module";
import { AwardItemComponent } from "./award-item/award-item.component";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PickerModule } from "@ctrl/ngx-emoji-mart";

const components = [
  AwardsPage,
  CreateAwardComponent,
  AwardItemComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileSharedComponentsModule,
    ComponentsSharedModule,
    EmojiModule,
    PickerModule
  ],
  exports: components,
})
export class AwardModule {}
