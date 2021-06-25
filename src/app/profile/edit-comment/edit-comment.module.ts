import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { EditCommentPageRoutingModule } from './edit-comment-routing.module';

import { EditCommentPage } from './edit-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    EditCommentPageRoutingModule
  ],
  declarations: []
})
export class EditCommentPageModule {}
