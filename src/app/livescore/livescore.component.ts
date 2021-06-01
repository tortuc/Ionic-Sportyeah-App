import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LivescoreService } from '../service';
import { Score, PastMatch, Fixture } from '../models';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';
import { switchMap, share, retry, takeUntil } from 'rxjs/operators';
import { LIVESCORE_POLLING_INTERVAL } from '@app/constants';
import { 
  LivescoreResumeComponent,
  LivescoreStatisticsComponent,
  LivescoreStandingsComponent
} from '../livescore-components';

enum Tabs {
  LIVE = 'EN DIRECTO',
  FINISHED = 'FINALIZADOS',
  UPCOMING = 'PRÓXIMOS',
}

enum ActionSheetOptions {
  RESUME = 'Resumen',
  STATISTICS = 'Estadísticas',
  STANDINGS = 'Clasificación',
}

enum MatchStatus {
  NOT_STARTED = 'NOT STARTED',
  IN_PLAY = 'IN PLAY',
  HALF_TIME_BREAK = 'HALF TIME BREAK',
  ADDED_TIME = 'ADDED TIME',
  FINISHED = 'FINISHED',
  INSUFFICIENT_DATA = 'INSUFFICIENT DATA',
}

type Match = Score | PastMatch | Fixture;

@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.component.html',
  styleUrls: ['./livescore.component.scss'],
})
export class LivescoreComponent implements OnInit {

  MatchStatus = MatchStatus;

  Tabs = Tabs;

  public scores: Score[] | null;

  public pastMatches: PastMatch[] | null;

  public fixtures: Fixture[] | null;

  public items: Match[] | null;

  public currentTab: Tabs = Tabs.LIVE;

  public readonly tabChange$: Subject<Tabs> = new BehaviorSubject<Tabs>(this.currentTab);

  private readonly componentDestroyed$: Subject<void> = new Subject<void>();

  public competitions: string[] | null;

  constructor(
    private readonly livescoreService: LivescoreService,
    private readonly route: ActivatedRoute,
    private readonly actionSheetController: ActionSheetController,
    private readonly modalController: ModalController
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

  private getCompetitions(matches: Match[]): string[] {
    return [... new Set(matches.map((match: Match): string => {
      return match instanceof Fixture 
      ? match.competition.name 
      : match.competitionName;
    }))];
  }

  public getMatchesOfCompetition(competitionName: string): Match[] {
    return this.items.filter((match: Match): boolean => {
      return match instanceof Fixture 
      ? match.competition.name == competitionName
      : match.competitionName == competitionName;
    });
  }

  private checkIfAlreadyExists(score: Score): boolean {
    return this.scores.some((_score: Score): boolean => _score.id === score.id);
  }

  private listenTabChanges(): void {
    this.tabChange$.subscribe((tab: Tabs): void => {
      this.currentTab = tab
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
      this.competitions = this.getCompetitions(this.items);
    });
  }

  public onSegmentChange(event: any): void {
    this.tabChange$.next(event.detail.value);
  }

  public async onMatchClick(match: Match) {
    const actionSheet: any = await this.createActionSheet(match);
    await actionSheet.present();
  }

  private createActionSheet(match: Match): any {

    const actionSheetButtons: any[] = [
      {
        text: ActionSheetOptions.RESUME,
        handler: async () => {
          const modal: any = await this.createModal(
            ActionSheetOptions.RESUME, 
            match
          );
          await modal.present();
        },
      },
      {
        text: ActionSheetOptions.STANDINGS,
        handler: async () => {
          const modal: any = await this.createModal(
            ActionSheetOptions.STANDINGS, 
            match
          );
          await modal.present();
        },
      },
      {
        text: ActionSheetOptions.STATISTICS,
        handler: async () => {
          const modal: any = await this.createModal(
            ActionSheetOptions.STATISTICS,
            match
          );
          await modal.present();
        },
      },
    ].filter((button: any): boolean => {
      if (
        (this.currentTab == Tabs.UPCOMING 
        && button.text == ActionSheetOptions.STATISTICS) || 
        (this.currentTab == Tabs.UPCOMING 
        && button.text == ActionSheetOptions.RESUME) 
      ) {
        return false;
      }
      return true;
    });

    return this.actionSheetController.create({
      buttons: actionSheetButtons,
    });
  }

  private createModal(option: ActionSheetOptions, data: Match): any {

    let modalComponent: any;

    switch (option) {
      case ActionSheetOptions.RESUME: {
        modalComponent = LivescoreResumeComponent;
        break;
      }
      case ActionSheetOptions.STATISTICS: {
        modalComponent = LivescoreStatisticsComponent;
        break;
      }
      case ActionSheetOptions.STANDINGS: {
        modalComponent = LivescoreStandingsComponent;
        break;
      }
    }

    return this.modalController.create({
      component: modalComponent,
      componentProps: data,
    });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

}
