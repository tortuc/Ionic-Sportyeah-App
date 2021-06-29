import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsSharedModule } from 'src/app/shared-components/components-shared.module';
import { RouterModule } from '@angular/router';
import { CommentComponentsModule } from 'src/app/comment-components/comment-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    TranslateModule,
    PipesModule,
    ComponentsSharedModule,
    RouterModule,
    CommentComponentsModule
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
