import { Adapter } from './adapter.interface';
import { Score } from './score.model';

export class ScoreAdapter implements Adapter<Score> {

  constructor() {}

  public deserialize(data: any): Score { 
    return new Score(
      new Date(data.Date),
      data.League,
      +data.Round,
      data.Time,
      +data.HomeGoals,
      +data.AwayGoals,
      data.Location,
      data.Stadium
    );
  }

  public serialize(data: Score): any {
    return {
      date: data.league,
      round: data.round,
      time: data.time,
      homeGoals: data.homeGoals,
      awayGoals: data.awayGoals,
      location: data.location,
      stadium: data.stadium,
    };
  }

}