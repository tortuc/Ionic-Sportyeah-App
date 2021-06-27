import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { IComment } from '../models/iPost';
import { User } from '../models/IUser';

export interface IReport{
  _id:string;
  user:User,
  comment?:IComment,
  reason:string,
  date:Date;
  status: 0 | 1 | 2;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private readonly http:HttpClient
  ) { }

  private readonly route = `${environment.URL_API}/report` 

  createReport(report){
    return this.http.post(`${environment.URL_API}/report/create`,report)
  }

  getReportById(id){
    return this.http.get<IReport>(`${this.route}/one/${id}`).pipe(take(1))
  }
}
