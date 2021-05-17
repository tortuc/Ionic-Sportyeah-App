import { Adapter } from './adapter.interface';
import { Score } from './score.model';
import { TIMEZONE } from '@app/constants';
import * as moment from 'moment-timezone';

export class ScoreAdapter implements Adapter<Score> {

  constructor() {}

  public deserialize(data: any): Score { 
    return new Score(
      data.id,
      data.home_name,
      data.away_name,
      data.score,
      data.ht_score,
      data.ft_score,
      data.et_score,
      data.time,
      data.league_id,
      data.league_name,
      moment.tz(data.added, 'YYYY-MM-DD hh:mm:ss', TIMEZONE),
      moment.tz(data.last_changed, 'YYYY-MM-DD hh:mm:ss', TIMEZONE),
      data.status,
      data.home_id,
      data.away_id,
      data.events,
      data.competition_id,
      data.competition_name,
      data.location,
      data.fixture_id,
      moment.tz(data.scheduled, 'hh:mm', TIMEZONE)
    );
  }

  public serialize(data: Score): any {
    return {
      id: data.id,
      home_name: data.homeName,
      away_name: data.awayName,
      score: data.score,
      ht_score: data.htScore,
      ft_score: data.ftScore,
      et_score: data.etScore,
      time: data.time,
      league_id: data.leagueId,
      league_name: data.leagueName,
      added: data.added,
      last_changed: data.lastChanged,
      status: data.status,
      home_id: data.homeId,
      away_id: data.awayId,
      events: data.events,
      competition_id: data.competitionId,
      competition_name: data.competitionName,
      location: data.location,
      fixture_id: data.fixtureId,
      scheduled: data.scheduled,
    };
  }

}