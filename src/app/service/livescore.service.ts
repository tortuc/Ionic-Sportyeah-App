import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { 
  Score, 
  ScoreAdapter, 
  PastMatch, 
  PastMatchAdapter, 
  Fixture, 
  FixtureAdapter,
  MatchEvent,
  MatchEventAdapter,
  Standing,
  StandingAdapter,
  MatchStatistic,
  MatchStatisticAdapter,
} from '../models';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

enum Endpoints {
  SCORES = 'scores',
  PAST_MATCHES = 'past-matches',
  FIXTURES = 'fixtures',
  EVENTS = 'events',
  STANDINGS = 'standings',
  STATISTIC = 'statistic',
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

  public getMatchEvents(matchId: number): Observable<MatchEvent[]> {
    return this.http
    .get<MatchEvent[]>(`${ env.URL_API }/livescore/${ Endpoints.EVENTS }/${ matchId }`)
    .pipe(
      map((data: any): MatchEvent[] => data.data.event.map((matchEvent: any): MatchEvent => {
        return new MatchEventAdapter().deserialize(matchEvent);
      }))
    );
  }

  public getMatchStatistic(matchId: number): Observable<MatchStatistic> {
    return this.http
    .get<MatchStatistic[]>(`${ env.URL_API }/livescore/${ Endpoints.STATISTIC }/${ matchId }`)
    .pipe(
      map((data: any): MatchStatistic => {
        return new MatchStatisticAdapter().deserialize(data.data);
      })
    );
  }

  public getCompetitionStandings(competitionId: number): Observable<Standing[]> {
    return this.http
    .get<Standing[]>(`${ env.URL_API }/livescore/${ Endpoints.STANDINGS }/competition/${ competitionId }`)
    .pipe(
      map((data: any): Standing[] => data.data.table.map((standing: any): Standing => {
        return new StandingAdapter().deserialize(standing);
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
