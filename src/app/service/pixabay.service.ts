import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface PixabayResp {
  total:     number;
  totalHits: number;
  hits:      PixabayImage[] | PixabayVideo[];
}

export interface PixabayImage {
  id:              number;
  pageURL:         string;
  type:            Type;
  tags:            string;
  previewURL:      string;
  previewWidth:    number;
  previewHeight:   number;
  webformatURL:    string;
  webformatWidth:  number;
  webformatHeight: number;
  largeImageURL:   string;
  imageWidth:      number;
  imageHeight:     number;
  imageSize:       number;
  views:           number;
  downloads:       number;
  favorites:       number;
  likes:           number;
  comments:        number;
  user_id:         number;
  user:            string;
  userImageURL:    string;
}

export enum Type {
  Illustration = "illustration",
  Photo = "photo",
  VectorSVG = "vector/svg",
}

export interface PixabayVideo {
  id:           number;
  pageURL:      string;
  type:         string;
  tags:         string;
  duration:     number;
  picture_id:   string;
  videos:       Videos;
  views:        number;
  downloads:    number;
  favorites:    number;
  likes:        number;
  comments:     number;
  user_id:      number;
  user:         string;
  userImageURL: string;
}

export interface Videos {
  large:  VideoInfo;
  medium: VideoInfo;
  small:  VideoInfo;
  tiny:   VideoInfo;
}

export interface VideoInfo {
  url:    string;
  width:  number;
  height: number;
  size:   number;
}


@Injectable({
  providedIn: 'root'
})

export class PixabayService {
  private apiClient = '20269395-8f49a07f33e103ce2d8bbdbb7';
  private apiUrl = `https://pixabay.com/api/?key=${this.apiClient}`;
  private apiUrlVideos = `https://pixabay.com/api/videos/?key=${this.apiClient}`;
  private headers = new HttpHeaders({});
  private _maxImagesPerResp = 42;
  private _minDimensions: [number, number] = [0,0];

  get maxImagesPerResp() {
    return this._maxImagesPerResp;
  }

  get minDimensions() {
    return this._minDimensions
  }
  set minDimensions(value: [number, number]) {
    this._minDimensions = value;
  }

  constructor(
    private http: HttpClient
  ) {}
  
  searchImages( query, page = 1 ): Promise<PixabayResp> {
    query = encodeURIComponent(query);

    return this.http.get(`${this.apiUrl}&q=${query}&lang=es&per_page=${this.maxImagesPerResp}&page=${page}&min_width=${this.minDimensions[0]}&min_height=${this.minDimensions[1]}`, { headers: this.headers }).toPromise() as any;
  }

  searchVideos( query, page = 1 ): Promise<PixabayResp> {
    query = encodeURIComponent(query);

    return this.http.get(`${this.apiUrlVideos}&q=${query}&lang=es&per_page=${this.maxImagesPerResp}&page=${page}&min_width=${this.minDimensions[0]}&min_height=${this.minDimensions[1]}`, { headers: this.headers }).toPromise() as any;
  }
}


