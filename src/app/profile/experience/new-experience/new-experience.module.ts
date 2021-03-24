import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewExperiencePageRoutingModule } from './new-experience-routing.module';
import { NewExperiencePage } from './new-experience.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    NewExperiencePageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [NewExperiencePage]
})
export class NewExperiencePageModule {}
