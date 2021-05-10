import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Score, ScoreAdapter } from '../models';
import { Observable, Subject, timer } from 'rxjs';
import { map, switchMap, share, retry, takeUntil } from 'rxjs/operators';

enum Tabs {
  ALL,
  LIVE,
  FAVORITES,
  FINISHED,
  UPCOMING,
}

@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.component.html',
  styleUrls: ['./livescore.component.scss'],
})
export class LivescoreComponent implements OnInit {

  private readonly componentDestroyed$: Subject<void> = new Subject<void>();

  public scores: Score[] | null;

  constructor(private readonly http: HttpClient) { }

  public ngOnInit(): void { 
    this.getScores().subscribe((data: any) => console.log(data));
    timer(1, 20000).pipe(
      switchMap((): Observable<Score[]> => this.getScores()),
      retry(),
      share(),
      takeUntil(this.componentDestroyed$)
    ).subscribe((scores: Score[]): void => {
      this.scores = scores;
      console.log(scores); // Testing purposes..
    });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  private getScores(): Observable<Score[]> {
    return this.http
    .get<Score[]>(`${ env.URL_LIVESCORE_API }/json/1/latestsoccer.php`)
    .pipe(
      map((scores: any): Score[] => scores.teams.Match.map((score: any): Score => {
        return new ScoreAdapter().deserialize(score);
      }))
    );
  }

  public onSegmentChange(event: any): void { 
    console.log(event);
  }

}
