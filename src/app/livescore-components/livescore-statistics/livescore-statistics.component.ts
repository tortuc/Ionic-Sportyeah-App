import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { indicate } from '@app/rxjs-operators';
import { DEFAULT_LOADING_MSG } from '@app/constants';
import { LivescoreService } from '../../service';
import { MatchStatistic } from '../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-livescore-statistics',
  templateUrl: './livescore-statistics.component.html',
  styleUrls: ['./livescore-statistics.component.scss'],
})
export class LivescoreStatisticsComponent implements OnInit {

  public stats: any[] | null;

  @Input()
  public readonly id: number | null;

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
    this.getMatchStatistic();
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

  private getMatchStatistic(): void {
    this.livescoreService.getMatchStatistic(this.id).pipe(
      indicate(this.loading$)
    ).subscribe((matchStatistic: MatchStatistic): void => {
      this.stats = this.getStats(matchStatistic);
    });  
  }

  private getStats(matchStatistic: MatchStatistic): any[] {
    const labels = [
      'Tarjetas Amarillas',
      'Tarjetas Rojas',
      'Sustituciones',
      'Posesion',
      'Tiros libres',
      'Saques de puerta',
      'Lanzamientos',
      'Fuera de juego',
      'Corners',
      'Remates a puerta',
      'Remates fuera',
      'Intentos de Gol',
      'Paradas',
      'Faltas',
      'Tratamientos',
      'Penales',
      'Remates bloqueados',
      'Ataques peligrosos',
      'Ataques',
    ];

    const props: string[] = Object.getOwnPropertyNames(matchStatistic);

    return props
    .slice(0, props.length / 2)
    .map((prop: string, index: number): any => {
      return {
        label: labels[index],
        home: matchStatistic[prop],
        homePercent: prop == 'homePossesion' 
        ? matchStatistic.homePossesion
        : matchStatistic.getPercentage(prop),
        away: matchStatistic[prop.replace('home', 'away')],
        awayPercent: prop == 'homePossesion' 
        ? matchStatistic.awayPossesion 
        : matchStatistic.getPercentage(prop.replace('home', 'away'))
      };
    });
  }

  public onClose(): void {
    this.modalController.dismiss();
  }

}