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
import { ButtonsOptionsComponent } from './buttons-options/buttons-options.component';
import { AttachLinkPreviewNewsComponent } from './attach-link-preview-news/attach-link-preview-news.component';
import { ComponentsSharedModule } from 'src/app/shared-components/components-shared.module';
import { RecordAudioNewsComponent } from './record-audio-news/record-audio-news.component';
import { MsgAudioNewsComponent } from './msg-audio-news/msg-audio-news.component';
 
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
    ComponentsSharedModule,
  ],
  declarations: [
    NewsPage,
    CreateComponent,
    EditComponent, 
    ReadComponent,
    StreamComponent,
    CreateStreamComponent,
    ButtonsOptionsComponent,
    AttachLinkPreviewNewsComponent,
    RecordAudioNewsComponent,
    MsgAudioNewsComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsPageModule {}
