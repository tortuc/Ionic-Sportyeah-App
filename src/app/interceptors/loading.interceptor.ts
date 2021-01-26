import { LoadingController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, mergeMap, take } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private router: Router, public loading: LoadingController) {}
  array = []
  loadingObservable = new Subject<any>();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const id = Math.floor(Math.random() * 20).toString() + ` ${req.url.slice(15)}`;
    this.presentLoading(id);
    return this.loadingObservable.pipe(
      take(1),
      mergeMap((loading: any) => {
        return next
          .handle(req)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              //this.loading.dismiss(null, null, id);
              this.array.splice(this.array.indexOf(id),1)
              return throwError(err);
            })
          )
          .pipe(
            map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
              if (evt instanceof HttpResponse) {
                //this.loading.dismiss(null, null, id);
                this.array.splice(this.array.indexOf(id),1)
              }
              return evt;
            })
          );
      })
    );
  }
  async presentLoading(url: string): Promise<void> {
    const loadingC = await this.loading.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
      id: url,
    });
    //await loadingC.present();
    this.loadingObservable.next(loadingC);
  }
}
