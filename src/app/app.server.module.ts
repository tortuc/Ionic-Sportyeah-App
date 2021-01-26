import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { IonicServerModule } from '@ionic/angular-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { translateServerLoaderFactory } from './shared/loaders/translate-server.loader'

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    IonicServerModule,
    FlexLayoutServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
    
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
