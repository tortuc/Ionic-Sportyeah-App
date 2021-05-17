import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { 
  Score, 
  ScoreAdapter, 
  PastMatch, 
  PastMatchAdapter, 
  Fixture, 
  FixtureAdapter 
} from '../models';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

enum Endpoints {
  SCORES = 'scores',
  PAST_MATCHES = 'past-matches',
  FIXTURES = 'fixtures',
}

@Injectable({
  providedIn: 'root',
})
export class LivescoreService {

  constructor(private readonly http: HttpClient) { }

  public getScores(): Observable<Score[]> {
    return this.http
    .get<Score[]>(`${ env.URL_API }/livescore/${ Endpoints.SCORES }`)
    .pipe(
      map((data: any): Score[] => data.data.match.map((score: any): Score => {
        return new ScoreAdapter().deserialize(score);
      }))
    );
  }

  public getPastMatches(): Observable<PastMatch[]> {
    return this.http
    .get<PastMatch[]>(`${ env.URL_API }/livescore/${ Endpoints.PAST_MATCHES }`)
    .pipe(
      map((data: any): PastMatch[] => data.data.match.map((match: any): PastMatch => {
        return new PastMatchAdapter().deserialize(match);
      }))
    );
  }

  public getFixtures(): Observable<Fixture[]> {
    return this.http
    .get<Fixture[]>(`${ env.URL_API }/livescore/${ Endpoints.FIXTURES }`)
    .pipe(
      map((data: any): Fixture[] => data.data.fixtures.map((fixture: any): Fixture => {
        return new FixtureAdapter().deserialize(fixture);
      }))
    );
  }

  public getAll(): Observable<{
    scores: Score[], 
    pastMatches: PastMatch[], 
    fixtures: Fixture[] 
  }> {
    return forkJoin({
      scores: this.getScores(),
      pastMatches: this.getPastMatches(),
      fixtures: this.getFixtures()
    });
  }

}
