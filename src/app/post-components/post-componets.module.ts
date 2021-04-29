import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DirectivesModule } from "src/app/directives/directive.module";
import { RouterModule } from "@angular/router";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { CommentPostComponent } from "./comment-post/comment-post.component";
import { NewPostHeaderComponent } from "./new-post-header/new-post-header.component";
import { PostPreviewImagesComponent } from "./post-preview-images/post-preview-images.component";
import { PostPreviewImagesSliderComponent } from "./post-preview-images-slider/post-preview-images-slider.component";
import { ViewCommentComponent } from "./view-comment/view-comment.component";
import { SeeFilesPostSliderComponent } from "./see-files-post-slider/see-files-post-slider.component";
import { QuestionCommentComponent } from "../components/question-comment/question-comment.component";

const componets = [
 CommentPostComponent,
 NewPostHeaderComponent,
 PostPreviewImagesComponent,
 PostPreviewImagesSliderComponent,
 ViewCommentComponent,
 SeeFilesPostSliderComponent,
 QuestionCommentComponent
  // NewPostPage
];

@NgModule({
  declarations: componets,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ContenteditableValueAccessorModule,
    ComponentsSharedModule,
    EmojiModule,
    PickerModule,
    DirectivesModule,
    RouterModule
  ],
  exports: componets,
})
export class PostComponetsModule {}
