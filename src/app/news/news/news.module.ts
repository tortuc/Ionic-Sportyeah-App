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
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { DirectivesModule } from 'src/app/directives/directive.module';
import { ProfileNewsComponent } from './profile-news/profile-news.component';
import { ShowNewsComponent } from './profile-news/show-news/show-news.component';
import { ModalProgramNewsComponent } from './modal-program-news/modal-program-news.component';
import { LikesNewsComponent } from './likes-news/likes-news.component';
import { AllReactionsNewsComponent } from './all-reactions-news/all-reactions-news.component';
import { LikesReactionsNewsComponent } from './likes-reactions-news/likes-reactions-news.component';
import { CreateStreamNewsComponent } from './create-stream-news/create-stream-news.component';
import { StreamNewsComponent } from './stream-news/stream-news.component';
import { SponsorsModule } from 'src/app/sponsors-components/sponsors.module';
import { SubtitleNewsComponent } from './subtitle-news/subtitle-news.component';
import { PreviewNewsComponent } from './preview-news/preview-news.component';
import { AftherCreateNewsComponent } from './afther-create-news/afther-create-news.component';

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
    DirectivesModule,
    SponsorsModule
  ],
  exports:[ModalProgramNewsComponent],
  declarations: [
    NewsPage,
    CreateComponent,
    EditComponent, 
    ReadComponent,
    StreamNewsComponent,
    CreateStreamNewsComponent,
    ButtonsOptionsComponent, 
    RecordAudioNewsComponent,
    MsgAudioNewsComponent,
    NewsOptionPostComponent,
    ReactToNewsComponent,
    CommentsInNewsComponent,
    CommentNewsComponent,
    SharedsInNewsComponent,
    ProfileNewsComponent,
    ShowNewsComponent,
    AttachLinkPreviewNewsComponent,
    ModalProgramNewsComponent,
    LikesNewsComponent,
    AllReactionsNewsComponent,
    LikesReactionsNewsComponent,
    SubtitleNewsComponent,
    PreviewNewsComponent,
    AftherCreateNewsComponent
  ],
 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsPageModule {}
