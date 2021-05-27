import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "src/app/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { ExperienceFilesSliderComponent } from "src/app/experiences/experience/experience-item/experience-files-slider/experience-files-slider.component";
import { ExperienceItemPreviewFilesComponent } from "src/app/experiences/experience/experience-item/experience-item-preview-files/experience-item-preview-files.component";
import { ExperiencieFilesPreviewComponent } from "src/app/experiences/experiencie-files-preview/experiencie-files-preview.component";
import { SocialNetworksComponent } from "./social-networks/social-networks.component";
import { EditSocialNetworksComponent } from "./edit-social-networks/edit-social-networks.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SocialNetworksPublicComponent } from "./social-networks-public/social-networks-public.component";

const components = [
  ExperiencieFilesPreviewComponent,
  ExperienceItemPreviewFilesComponent,
  ExperienceFilesSliderComponent,
  SocialNetworksComponent,
  EditSocialNetworksComponent,
  SocialNetworksPublicComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: components,
})
export class ProfileSharedComponentsModule {}
