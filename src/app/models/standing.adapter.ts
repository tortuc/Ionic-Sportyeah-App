import { Adapter } from './adapter.interface';
import { Standing } from './standing.model';

export class StandingAdapter implements Adapter<Standing> {

  constructor() {}

  public deserialize(data: any): Standing { 
    return new Standing(
      data.league_id,
      data.season_id,
      data.name,
      data.rank,
      data.points,
      data.matches,
      data.goal_diff,
      data.goals_scored,
      data.goals_conceded,
      data.lost,
      data.drawn,
      data.won,
      data.team_id,
      data.competition_id
    );
  }

  public serialize(data: Standing): any {
    return {
      league_id: data.leagueId,
      season_id: data.seasonId,
      name: data.name,
      rank: data.rank,
      points: data.points,
      matches: data.matches,
      goal_diff: data.goalDiff,
      goals_scored: data.goalsScored,
      goals_conceded: data.goalsConceded,
      lost: data.lost,
      drawn: data.drawn,
      won: data.won,
      team_id: data.teamId,
      competition_id: data.competitionId
    };
  }

}