import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface Aptitudes {
  _id: string;
  userId: string;
  score: string;
  title: string;
  date: Date;
  deleted: boolean;
}

@Injectable({
  providedIn: "root",
})
export class FreeImgService {
  public API_KEY = `20049725-80880e4a07d61ba9e705131e6`;
  public URL = `https://pixabay.com/api/?key=${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get(
      this.URL
    );
  }
}
