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
import { EditQuestionComponent } from "../components/edit-question/edit-question.component";
import { AttachLinkPreviewPostComponent } from "./attach-link-preview-post/attach-link-preview-post.component";
import { ReactToPostsComponent } from "./react-to-posts/react-to-posts.component";
import { LikesPostComponent } from "./likes-post/likes-post.component";
import { AllReactionsComponent } from "./all-reactions/all-reactions.component";
import { LikesReactionsComponent } from "./likes-reactions/likes-reactions.component";
import { PostOptionsComponent } from "../components/post-options/post-options.component";
import { SharedsPostComponent } from "../components/shareds-post/shareds-post.component";
import { UserItemReactionsComponent } from "./user-item-reactions/user-item-reactions.component";
import { CommentsInPotsComponent } from "./comments-in-pots/comments-in-pots.component";
import { SharedsInPostComponent } from "./shareds-in-post/shareds-in-post.component";
import { NewPostPage } from "../dashboard/new-post/new-post.page";
import { PostSharedComponent } from "../components/post-shared/post-shared.component";

const componets = [
  CommentPostComponent,
  NewPostHeaderComponent,
  PostPreviewImagesComponent,
  PostPreviewImagesSliderComponent,
  ViewCommentComponent,
  SeeFilesPostSliderComponent,
  QuestionCommentComponent,
  EditQuestionComponent,
  AttachLinkPreviewPostComponent,
  ReactToPostsComponent,
  LikesPostComponent,
  AllReactionsComponent,
  LikesReactionsComponent,
  PostOptionsComponent,
  SharedsPostComponent,
  UserItemReactionsComponent,
  CommentsInPotsComponent,
  SharedsInPostComponent,
  NewPostPage,
  PostSharedComponent
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
    RouterModule,
  ],
  exports: componets,
})
export class PostComponetsModule {}
