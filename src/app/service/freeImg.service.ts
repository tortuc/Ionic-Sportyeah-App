import { Observable } from 'rxjs';
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

interface IImagePixabay{
  comments: number;
  downloads: number;
  favorites: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageUrl: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

export interface IResponsePixabay{
  hits: IImagePixabay[];
  total: number;
  totalHits: number;
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
  getSearch(search:string): Observable<any> {
    search.replace(' ','+')
    return this.http.get(
      `${this.URL}&q=${search}`
    );
  }
}
