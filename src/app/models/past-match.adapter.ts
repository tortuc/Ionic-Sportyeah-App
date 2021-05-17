import { Adapter } from './adapter.interface';
import { PastMatch } from './past-match.model';
import { TIMEZONE } from '@app/constants';
import * as moment from 'moment-timezone';

export class PastMatchAdapter implements Adapter<PastMatch> {

  constructor() { }

  public deserialize(data: any): PastMatch { 
    return new PastMatch(
      data.id,
      moment.tz(data.date, 'YYYY-MM-DD', TIMEZONE),
      data.home_name,
      data.away_name,
      data.ht_score,
      data.ft_score,
      data.et_score,
      data.time,
      data.league_id,
      data.status,
      moment.tz(data.added, 'YYYY-MM-DD hh:mm:ss', TIMEZONE),
      moment.tz(data.last_changed, 'YYYY-MM-DD hh:mm:ss', TIMEZONE),
      data.home_id,
      data.away_id,
      data.competition_id,
      data.competition_name,
      data.location,
      data.fixture_id,
      moment.tz(data.scheduled, 'hh:mm', TIMEZONE)
    );
  }

  public serialize(data: PastMatch): any { 
    return {
      id: data.id,
      date: data.date,
      home_name: data.homeName,
      away_name: data.awayName,
      ht_score: data.htScore,
      ft_score: data.ftScore,
      et_score: data.etScore,
      time: data.time,
      league_id: data.leagueId,
      status: data.status,
      added: data.added,
      last_changed: data.lastChanged,
      home_id: data.homeId,
      away_id: data.awayId,
      competition_id: data.competitionId,
      competition_name: data.competitionName,
      location: data.location,
      fixture_id: data.fixtureId,
      scheduled: data.scheduled,
    };
  }

}