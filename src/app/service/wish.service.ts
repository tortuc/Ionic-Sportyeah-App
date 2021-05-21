import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WishService {
  constructor(private http: HttpClient) {}

  pageInfo(url) {
    return this.http.post(`${environment.URL_API}/wish/page`, { url });
  }
}
