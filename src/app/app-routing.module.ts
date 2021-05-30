import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ExecutiveProfileComponent } from "./components/structure/private-organization-chart/executive-profile/executive-profile.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { LandingGuard } from "./guards/landing-guard.service";
import { SessionGuardService } from "./guards/session-guard.service";
import { LivescoreModule } from "./livescore";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "livescore",
    loadChildren: (): Promise<LivescoreModule> =>
      import("./livescore").then((m) => m.LivescoreModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
    canActivate: [SessionGuardService],
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
    canActivate: [SessionGuardService],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "forgot",
    loadChildren: () =>
      import("./forgot/forgot.module").then((m) => m.ForgotPageModule),
    canActivate: [SessionGuardService],
  },
  {
    path: "newpassword",
    loadChildren: () =>
      import("./newpassword/newpassword.module").then(
        (m) => m.NewpasswordPageModule
      ),
  },
  {
    path: "verification",
    loadChildren: () =>
      import("./verification/verification.module").then(
        (m) => m.VerificationPageModule
      ),
  },
  {
    path: "langs",
    loadChildren: () =>
      import("./langs/langs.module").then((m) => m.LangsPageModule),
  },
  {
    path: "challenges",
    loadChildren: () =>
      import("./challenges/challenges.module").then(
        (m) => m.ChallengesPageModule
      ),
    canActivate: [AuthGuardService],
  },

  {
    path: "challenges/:username",
    loadChildren: () =>
      import("./challenges/profile-challenge/profile-challenge.module").then(
        (m) => m.ProfileChallengePageModule
      ),
    canActivate: [LandingGuard],
  },
  {
    path: "landing/:id",
    loadChildren: () =>
      import("./patrocinadores/landing/landing.module").then(
        (m) => m.LandingPageModule
      ),
    canActivate: [LandingGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "chat",
    loadChildren: () =>
      import("./chat/chat.module").then((m) => m.ChatPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "post/:id",
    loadChildren: () =>
      import("./post/post.module").then((m) => m.PostPageModule),
    canActivate: [LandingGuard],
  },
  {
    path: "user/:username",
    loadChildren: () =>
      import("./user/user.module").then((m) => m.UserPageModule),
    canActivate: [LandingGuard],
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then(
        (m) => m.NotificationsPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "news",
    loadChildren: () =>
      import("./news/news/news.module").then((m) => m.NewsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "challenges",
    loadChildren: () =>
      import("./challenges/challenges.module").then(
        (m) => m.ChallengesPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "challenge/:id",
    loadChildren: () =>
      import("./challenge/challenge.module").then((m) => m.ChallengePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "challenge/:username/:id",
    loadChildren: () =>
      import("./challenge/challenge.module").then((m) => m.ChallengePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "ranking",
    loadChildren: () =>
      import("./ranking/ranking.module").then((m) => m.RankingPageModule),
    canActivate: [AuthGuardService],
  },

  {
    path: "search",
    loadChildren: () =>
      import("./pages/search/search.module").then((m) => m.SearchPageModule),
    canActivate: [AuthGuardService],
  },

  {
    path: "challenge",
    loadChildren: () =>
      import("./challenge/challenge.module").then((m) => m.ChallengePageModule),
  },

  {
    path: "group/:id",
    loadChildren: () =>
      import("./pages/invitation-group/invitation-group.module").then(
        (m) => m.InvitationGroupModule
      ),
    canActivate: [LandingGuard],
  },
  {
    path: "structure/organization/profile/:id",
    component: ExecutiveProfileComponent,
    canActivate: [LandingGuard],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./not-found/not-found.module").then((m) => m.NotFoundPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
