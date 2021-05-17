import { Adapter } from './adapter.interface';
import { Fixture } from './fixture.model';
import { TIMEZONE } from '@app/constants';
import * as moment from 'moment-timezone';

export class FixtureAdapter implements Adapter<Fixture> {

  constructor() { }

  public deserialize(data: any): Fixture { 
    return new Fixture(
      moment.tz(data.time, 'hh:mm:ss', TIMEZONE),
      data.round,
      data.home_name,
      data.away_name,
      data.location,
      data.league_id,
      data.home_id,
      data.away_id,
      data.competition_id,
      data.competition,
      moment.tz(data.date, 'YYYY-MM-DD', TIMEZONE),
    );
  }

  public serialize(data: Fixture): any { 
    return {
      time: data.time,
      round: data.round,
      home_name: data.homeName,
      away_name: data.awayName,
      location: data.location,
      league_id: data.leagueId,
      home_id: data.homeId,
      away_id: data.awayId,
      competition_id: data.competitionId,
      competition: data.competition,
      date: data.date,
    };
  }

}