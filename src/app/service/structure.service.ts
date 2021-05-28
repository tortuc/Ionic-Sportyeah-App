import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IFile } from "../models/iPost";
import { ISocialNetworks } from "../models/IUser";

export interface IStructure {
  user: string;
  name: string;
  title: string;
  description: string;
  date: Date;
  files: IFile[];
  socialNetworks: ISocialNetworks;
}

@Injectable({
  providedIn: "root",
})
export class StructureService {
  constructor(private readonly http: HttpClient) {}

  private readonly route = `${environment.URL_API}/structure`;

  getStructureByUser(id) {
    return this.http
      .get<IStructure>(`${this.route}/getbyuser/${id}`)
      .pipe(take(1));
  }
}
