import { Adapter } from './adapter.interface';
import { MatchEvent } from './match-event.model';

export class MatchEventAdapter implements Adapter<MatchEvent> {

  constructor() { }

  public deserialize(data: any): MatchEvent { 
    return new MatchEvent(
      data.id,
      data.match_id,
      data.player,
      data.time,
      data.event,
      data.sort,
      data.home_away,
      data.info
    );
  }

  public serialize(data: MatchEvent): any { 
    return {
      id: data.id,
      match_id: data.matchId,
      player: data.player,
      time: data.time,
      event: data.event,
      sort: data.sort,
      home_away: data.homeAway,
      info: data.info
    };
  }

}