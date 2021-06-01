import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { ProfilePage } from "./profile.page";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { OptionsPostPage } from "./options-post/options-post.page";
import { EditPostPage } from "./edit-post/edit-post.page";
import { PipesModule } from "../pipes/pipes.module";
import { FollowingPage } from "./following/following.page";
import { FollowerPage } from "./follower/follower.page";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DirectivesModule } from "../directives/directive.module";
import { ComponentsModule } from "../components/components.module";
import { NewNodeComponent } from "./structure/new-node/new-node.component";
import { IonCustomScrollbarModule } from "ion-custom-scrollbar";
import { PostComponetsModule } from "../post-components/post-componets.module";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { MsgProfileEditComponent } from "./msg-profile-edit/msg-profile-edit.component";
import { OptionNewsComponent } from "../news/news/option-news/option-news.component";
import { SponsorsModule } from "../sponsors-components/sponsors.module";
import { ExperiencesModule } from "../experiences/experiences.module";
import { AwardModule } from "../components/award/award.module";
import { AptitudesModule } from "../components/aptitudes/aptitudes.module";
import { GalleryModule } from "../components/gallery/gallery.module";
import { ProfileSharedComponentsModule } from "./profile-shared-components/profile-shared-components.module";
import { StructureModule } from "../components/structure/structure.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    PipesModule,
    ContenteditableValueAccessorModule,
    EmojiModule,
    PickerModule,
    DirectivesModule,
    IonCustomScrollbarModule,
    ComponentsSharedModule,
    PostComponetsModule,
    SponsorsModule,
    ExperiencesModule,
    AwardModule,
    AptitudesModule,
    GalleryModule,
    ProfileSharedComponentsModule,
    StructureModule
  ],
  declarations: [
    ProfilePage,
    OptionsPostPage,
    EditPostPage,
    FollowingPage,
    FollowerPage,
    NewNodeComponent,
    MsgProfileEditComponent,
    OptionNewsComponent,
  ],
})
export class ProfilePageModule {}
