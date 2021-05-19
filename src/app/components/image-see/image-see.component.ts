import { IPixelBayResponse } from './../../models/IPixelBayResponse';
import { take } from "rxjs/operators";
import { FreeImgService } from "./../../service/freeImg.service";
import { 
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FilesService } from 'src/app/service/files.service';

export interface EventTargetResponse extends EventTarget{
  response: Blob;
}

export interface ProgressEventResponse<T extends EventTargetResponse = EventTargetResponse> extends Event {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly target: T | null;
  readonly total: number;
}

@Component({
  selector: "app-image-see",
  templateUrl: "./image-see.component.html",
  styleUrls: ["./image-see.component.scss"],
})
export class ImageSeeComponent implements OnInit {
  @Input() data: any;
  search: string = "";
  constructor(
    public modalCtrl: ModalController,
    private loading: LoadingController,
    private translate: TranslateService,
    private filesServices: FilesService,
    public freeImg: FreeImgService
  ) {}

  ngOnInit() {}

  onsearch() {
    this.freeImg
      .getSearch(this.search)
      .pipe(take(1))
      .subscribe((r:IPixelBayResponse) => {
        this.data = r.hits
      });
  }

  async send(url: any) {
    // TRANSFORM IMG
    let loading = await this.loading.create({
      message: this.translate.instant("loading"),
    })
    loading.present()

    let xhr = new XMLHttpRequest()
        xhr.open("GET", url.webformatURL,true)
        xhr.responseType = "blob"
        xhr.onload = (ev: ProgressEventResponse<EventTargetResponse>) => {
          const target:any = ev.currentTarget
          const file = target.response
          const formData = new FormData()
          formData.append("image", file)
          this.uploadImage(formData, loading)
        }
    xhr.send()

  }

  uploadImage(formData: FormData, loading?) {
    this.filesServices
      .uploadImage(formData)
      .toPromise()
      .then((url) => {
        if (loading) loading.dismiss();
        this.modalCtrl.dismiss(url);
      })
      .catch((err) => {
        // handle err
        if (loading) loading.dismiss();
      });
  }


  close() {
    this.modalCtrl.dismiss();
  }
}
