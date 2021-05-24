import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StructurePageRoutingModule } from './structure-routing.module';

import { StructurePage } from './structure.page';
import { ComponentsModule } from 'src/app/components/components.module'
import { ExperiencesModule } from '../experiences/experiences.module';
import { AwardModule } from '../components/award/award.module';
import { AptitudesModule } from "../components/aptitudes/aptitudes.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StructurePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule,
    ExperiencesModule,
    AwardModule,
    AptitudesModule

  ],
  declarations: [StructurePage]
})
export class StructurePageModule {}
