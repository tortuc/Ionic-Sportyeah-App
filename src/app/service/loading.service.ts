import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loading: HTMLIonLoadingElement = null;

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly translate: TranslateService
  ) {}

  public async present() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    this.loading.present();
  }

  public dismiss() {
    this.loading.dismiss();
  }
}
