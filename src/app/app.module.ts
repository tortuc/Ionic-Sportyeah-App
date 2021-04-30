import { NgModule } from "@angular/core";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import {
  BrowserModule,
  BrowserTransferStateModule,
  TransferState,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { translateBrowserLoaderFactory } from "./shared/loaders/translate-browser.loader";
import { ComponentsModule } from "./components/components.module";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { IonicRatingModule } from "ionic4-rating";
import { Camera } from "@ionic-native/camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar'
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    IonicModule.forRoot(),
    AppRoutingModule,
    PickerModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    BrowserTransferStateModule,
    ComponentsModule,
    ClipboardModule,
    IonicRatingModule,
    IonCustomScrollbarModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaCapture,
    CookieService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SocialSharing,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
