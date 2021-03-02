import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import {NgxWigModule} from 'ngx-wig';

import{ CreateComponent } from './create/create.component'
import { EditComponent } from './edit/edit.component';
import { ReadComponent } from './read/read.component';
import { StreamComponent } from './stream/stream.component';
import { CreateStreamComponent } from './create-stream/create-stream.component';

import { HttpClientModule} from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    ReactiveFormsModule,
    NgxWigModule,
    HttpClientModule,
    TranslateModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [
    NewsPage,
    CreateComponent,
    EditComponent,
    ReadComponent,
    StreamComponent,
    CreateStreamComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsPageModule {}
