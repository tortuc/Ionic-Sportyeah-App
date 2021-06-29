import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { ComponentsSharedModule } from '../shared-components/components-shared.module';
import { ReportCloseonlyNotificationComponent } from './report-closeonly-notification/report-closeonly-notification.component';
import { ReportCloseNotificationComponent } from './report-close-notification/report-close-notification.component';
import { CommentComponentsModule } from '../comment-components/comment-components.module';
import { CommentNotificationComponent } from '../components/comment-notification/comment-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    FlexLayoutModule,
    TranslateModule,
    ComponentsSharedModule,
    ComponentsModule,
    PipesModule,
    CommentComponentsModule
  ],
  declarations: [NotificationsPage,ReportCloseonlyNotificationComponent,ReportCloseNotificationComponent,CommentNotificationComponent]
})
export class NotificationsPageModule {}
