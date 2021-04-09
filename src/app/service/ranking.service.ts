import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/iPost';

export interface IRankingRank{
count:number;
  _id:IPost;
}
export interface IRanking {
  ranking:IRankingRank[]
  total:number;
  myPosition:number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  route = `${environment.URL_API}/ranking`

  constructor(
    private http:HttpClient
  ) { }

  getRankingReactionsAllTime(user,country){
    return this.http.get<IRanking>(`${this.route}/reactions/ever/${user}/${country}`)
  }

  getRankingCommentsAllTime(user,country){
    return this.http.get<IRanking>(`${this.route}/comments/ever/${user}/${country}`)
  }

  getRankingSharedsAllTime(user,country){
    return this.http.get<IRanking>(`${this.route}/shareds/ever/${user}/${country}`)
  }

  getRankingViewsAllTime(user,country){
    return this.http.get<IRanking>(`${this.route}/views/ever/${user}/${country}`)
  }

  getRankingFollowersAllTime(user,country){
    return this.http.get<IRanking>(`${this.route}/followers/ever/${user}/${country}`)
  }

  getRankingReactionsDay(user,country,dateStart,dateEnd){
    return this.http.get<IRanking>(`${this.route}/reactions/day/${user}/${country}/${dateStart}/${dateEnd}`)
  }

  getRankingCommentsDay(user,country,dateStart,dateEnd){
    return this.http.get<IRanking>(`${this.route}/comments/day/${user}/${country}/${dateStart}/${dateEnd}`)
  }

  getRankingSharedsDay(user,country,dateStart,dateEnd){
    return this.http.get<IRanking>(`${this.route}/shareds/day/${user}/${country}/${dateStart}/${dateEnd}`)
  }

  getRankingViewsDay(user,country,dateStart,dateEnd){
    return this.http.get<IRanking>(`${this.route}/views/day/${user}/${country}/${dateStart}/${dateEnd}`)
  }
}
