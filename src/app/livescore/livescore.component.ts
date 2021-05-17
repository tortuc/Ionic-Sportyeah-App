import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivescoreService } from '../service';
import { Score, PastMatch, Fixture } from '../models';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';
import { switchMap, share, retry, takeUntil } from 'rxjs/operators';
import { LIVESCORE_POLLING_INTERVAL } from '@app/constants';

enum Tabs {
  LIVE = 'EN DIRECTO',
  FINISHED = 'FINALIZADOS',
  UPCOMING = 'PRÓXIMOS',
}

@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.component.html',
  styleUrls: ['./livescore.component.scss'],
})
export class LivescoreComponent implements OnInit {

  Tabs = Tabs;

  public scores: Score[] | null;

  public pastMatches: PastMatch[] | null;

  public fixtures: Fixture[] | null;

  public items: Score[] | PastMatch[] | Fixture[] | null;

  public currentTab: Tabs = Tabs.LIVE;

  public readonly tabChange$: Subject<Tabs> = new BehaviorSubject<Tabs>(this.currentTab);

  private readonly componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private readonly livescoreService: LivescoreService,
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.setInitialValues();
    this.startPolling();
    this.listenTabChanges();
  }

  private setInitialValues(): void {
    this.scores = this.route.snapshot.data.scores;
    this.pastMatches = this.route.snapshot.data.pastMatches;
    this.fixtures = this.route.snapshot.data.fixtures;
  }

  private startPolling(): void {
    timer(1, LIVESCORE_POLLING_INTERVAL).pipe(
      switchMap((): Observable<Score[]> => this.livescoreService.getScores()),
      retry(),
      share(),
      takeUntil(this.componentDestroyed$)
    ).subscribe((scores: Score[]): void => {
      scores.forEach((score: Score, index: number): void => {
        const alreadyExists: boolean = this.checkIfAlreadyExists(score);
        if (!alreadyExists) {
          this.scores.push(score);
        } else {
          Object.assign(this.scores[index], score);
        }
      });
    });
  }

  private checkIfAlreadyExists(score: Score): boolean {
    return this.scores.some((_score: Score): boolean => _score.id === score.id);
  }

  private listenTabChanges(): void {
    this.tabChange$.subscribe((tab: Tabs): void => {
      this.currentTab = tab;
      switch (tab) {
        case Tabs.LIVE: {
          this.items = this.scores;
          break;
        }
        case Tabs.FINISHED: {
          this.items = this.pastMatches;
          break;
        }
        case Tabs.UPCOMING: {
          this.items = this.fixtures;
          break;
        }
      }
    });
  }

  public onSegmentChange(event: any): void {
    this.tabChange$.next(event.detail.value);
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

}
