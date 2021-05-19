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
import { NewsOptionPostComponent } from './news-option-post/news-option-post.component';
import { ReactToNewsComponent } from './react-to-news/react-to-news.component';
import { CommentsInNewsComponent } from './comments-in-news/comments-in-news.component';
import { SharedsInNewsComponent } from './shareds-in-news/shareds-in-news.component';
import { CommentNewsComponent } from './comment-news/comment-news.component';
import { NewPostHeaderComponent } from 'src/app/post-components/new-post-header/new-post-header.component';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { PostPreviewImagesSliderComponent } from 'src/app/post-components/post-preview-images-slider/post-preview-images-slider.component';
import { PostPreviewImagesComponent } from 'src/app/post-components/post-preview-images/post-preview-images.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { DirectivesModule } from 'src/app/directives/directive.module';

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
    ContenteditableValueAccessorModule,
    EmojiModule,
    PickerModule,
    DirectivesModule
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
    MsgAudioNewsComponent,
    NewsOptionPostComponent,
    ReactToNewsComponent,
    CommentsInNewsComponent,
    CommentNewsComponent,
    SharedsInNewsComponent,
    NewPostHeaderComponent,
    PostPreviewImagesSliderComponent,
    PostPreviewImagesComponent
  ],
 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsPageModule {}
