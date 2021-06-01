import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { indicate } from '@app/rxjs-operators';
import { DEFAULT_LOADING_MSG } from '@app/constants';
import { LivescoreService } from '../../service';
import { MatchEvent } from '../../models';
import { Subject, BehaviorSubject } from 'rxjs';

enum Tabs {
  HOME = 'Local',
  AWAY = 'Visitante'
}

enum MatchEventType {
  GOAL = 'GOAL',
  GOAL_PENALTY = 'GOAL_PENALTY',
  OWN_GOAL = 'OWN_GOAL',
  YELLOW_CARD = 'YELLOW_CARD',
  RED_CARD = 'RED_CARD',
  SUBSTITUTION = 'SUBSTITUTION',
}

@Component({
  selector: 'app-livescore-resume',
  templateUrl: './livescore-resume.component.html',
  styleUrls: ['./livescore-resume.component.scss'],
})
export class LivescoreResumeComponent implements OnInit {

  Tabs = Tabs;

  MatchEventType = MatchEventType;

  private _matchEvents: MatchEvent[] | null;

  public matchEvents: MatchEvent[] | null;

  public currentTab: Tabs = Tabs.HOME;

  @Input()
  public readonly homeName: string;

  @Input()
  public readonly awayName: string;

  @Input()
  public readonly id: number;

  public readonly tabChange$: Subject<Tabs> = new BehaviorSubject<Tabs>(this.currentTab);

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly modalController: ModalController,
    private readonly loadingController: LoadingController,
    private readonly livescoreService: LivescoreService
  ) { }

  public ngOnInit(): void {
    this.presentLoading();
    this.getMatchEvents();
  }

  private async presentLoading() {

    const loading: any = await this.createLoading();
    await loading.present()

    this.loading$.subscribe(async (isLoading: boolean) => isLoading 
      ? await loading.present()
      : loading.dismiss()
    );
  }

  private createLoading() {
    return this.loadingController.create({
      message: DEFAULT_LOADING_MSG,
    });
  }

  private getMatchEvents(): void {
    this.livescoreService.getMatchEvents(this.id).pipe(
      indicate(this.loading$)
    ).subscribe((events: MatchEvent[]): void => {
      this._matchEvents = events;
      this.listenTabChanges();
    });
  }

  private listenTabChanges(): void {
    this.tabChange$.subscribe((tab: Tabs): void => {
      this.currentTab = tab;
      this.matchEvents = this._matchEvents.filter((event: MatchEvent): boolean => {
        switch (this.currentTab) {
          case Tabs.HOME: {
            return event.homeAway === 'h';
            break;
          }
          case Tabs.AWAY: {
            return event.homeAway === 'a';
            break;
          }
        }
      });
    });
  }

  public onSegmentChange(event: any): void {
    this.tabChange$.next(event.detail.value);
  }

  public onClose(): void {
    this.modalController.dismiss();
  }

}
