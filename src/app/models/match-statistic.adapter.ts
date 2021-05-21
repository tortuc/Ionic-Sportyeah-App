import { Adapter } from './adapter.interface';
import { MatchStatistic } from './match-statistic.model';

export class MatchStatisticAdapter implements Adapter<MatchStatistic> {

  constructor() {}

  public deserialize(data: any): MatchStatistic {

    const [homeYellowCards, awayYellowCards]: string[] = data.yellow_cards ? data.yellow_cards.split(':') : [null, null]; 
    const [homeRedCards, awayRedCards]: string[] = data.red_cards ? data.red_cards.split(':') : [null, null]; 
    const [homeSubstitutions, awaySubstitutions]: string[] = data.substitutions ? data.substitutions.split(':') : [null, null];
    const [homePossesion, awayPossesion]: string[] = data.possesion ? data.possesion.split(':') : [null, null];
    const [homeFreeKicks, awayFreeKicks]: string[] = data.free_kicks ? data.free_kicks.split(':') : [null, null];
    const [homeGoalKicks, awayGoalKicks]: string[] = data.goal_kicks ? data.goal_kicks.split(':') : [null, null];
    const [homeThrowIns, awayThrowIns]: string[] = data.throw_ins ? data.throw_ins.split(':') : [null, null];
    const [homeOffsides, awayOffsides]: string[] = data.offsides ? data.offsides.split(':') : [null, null];
    const [homeCorners, awayCorners]: string[] = data.corners ? data.corners.split(':') : [null, null];
    const [homeShotsOnTarget, awayShotsOnTarget]: string[] = data.shots_on_target ? data.shots_on_target.split(':') : [null, null];
    const [homeShotsOffTarget, awayShotsOffTarget]: string[] = data.shots_off_target ? data.shots_off_target.split(':') : [null, null];
    const [homeAttemptsOnGoal, awayAttemptsOnGoal]: string[] = data.attempts_on_goal ? data.attempts_on_goal.split(':') : [null, null]; 
    const [homeSaves, awaySaves]: string[] = data.saves ? data.saves.split(':') : [null, null]; 
    const [homeFauls, awayFauls]: string[] = data.fauls ? data.fauls.split(':') : [null, null]; 
    const [homeTreatments, awayTreatments]: string[] = data.treatments ? data.treatments.split(':') : [null, null]; 
    const [homePenalties, awayPenalties]: string[] = data.penalties ? data.penalties.split(':') : [null, null]; 
    const [homeShotsBlocked, awayShotsBlocked]: string[] = data.shots_blocked ? data.shots_blocked.split(':') : [null, null]; 
    const [homeDangerousAttacks, awayDangerousAttacks]: string[] = data.dangerous_attacks ? data.dangerous_attacks.split(':') : [null, null]; 
    const [homeAttacks, awayAttacks]: string[] = data.attacks ? data.attacks.split(':') : [null, null];

    return new MatchStatistic(
      +homeYellowCards,
      +homeRedCards,
      +homeSubstitutions,
      +homePossesion,
      +homeFreeKicks,
      +homeGoalKicks,
      +homeThrowIns,
      +homeOffsides,
      +homeCorners,
      +homeShotsOnTarget,
      +homeShotsOffTarget,
      +homeAttemptsOnGoal,
      +homeSaves,
      +homeFauls,
      +homeTreatments,
      +homePenalties,
      +homeShotsBlocked,
      +homeDangerousAttacks,
      +homeAttacks,
      +awayYellowCards,
      +awayRedCards,
      +awaySubstitutions,
      +awayPossesion,
      +awayFreeKicks,
      +awayGoalKicks,
      +awayThrowIns,
      +awayOffsides,
      +awayCorners,
      +awayShotsOnTarget,
      +awayShotsOffTarget,
      +awayAttemptsOnGoal,
      +awaySaves,
      +awayFauls,
      +awayTreatments,
      +awayPenalties,
      +awayShotsBlocked,
      +awayDangerousAttacks,
      +awayAttacks,
    );
  }

  public serialize(data: MatchStatistic): any {
    return {};
  }

}