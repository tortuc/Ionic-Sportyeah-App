import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { indicate } from '@app/rxjs-operators';
import { DEFAULT_LOADING_MSG } from '@app/constants';
import { LivescoreService } from '../../service';
import { Standing } from '../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-livescore-standings',
  templateUrl: './livescore-standings.component.html',
  styleUrls: ['./livescore-standings.component.scss'],
})
export class LivescoreStandingsComponent implements OnInit {

  public standings: Standing[] | null;

  @Input()
  public readonly competition: any | null;

  @Input()
  public readonly competitionId: number | null;

  @Input()
  public readonly competitionName: string | null;

  @Input()
  public readonly homeName: string | null;

  @Input()
  public readonly awayName: string | null;

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly modalController: ModalController,
    private readonly loadingController: LoadingController,
    private readonly livescoreService: LivescoreService
  ) { }

  public ngOnInit(): void {
    this.presentLoading();
    this.getStandings();
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

  private getStandings(): void {

    const competitionId: number = this.competition 
    ? this.competition.id 
    : this.competitionId;
    
    this.livescoreService.getCompetitionStandings(competitionId).pipe(
      indicate(this.loading$)
    ).subscribe((standings: Standing[]): void => {
      this.standings = standings;
    });  
  }

  public onClose(): void {
    this.modalController.dismiss();
  }

}