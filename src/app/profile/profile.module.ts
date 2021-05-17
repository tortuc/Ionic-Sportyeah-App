import { CarrouselComponent } from "./carrousel/carrousel.component";
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
import { ProfileSponsorsComponent } from "./profile-sponsors/profile-sponsors.component";

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
  ],
  declarations: [
    ProfilePage,
    OptionsPostPage,
    EditPostPage,
    FollowingPage,
    FollowerPage,
    CarrouselComponent,
    NewNodeComponent,
    MsgProfileEditComponent,
    OptionNewsComponent,
    ProfileSponsorsComponent
  ],
})
export class ProfilePageModule {}
