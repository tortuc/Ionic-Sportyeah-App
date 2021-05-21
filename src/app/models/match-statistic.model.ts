export class MatchStatistic {

  constructor(
    public homeYellowCards: number,
    public homeRedCards: number,
    public homeSubstitutions: number,
    public homePossesion: number,
    public homeFreeKicks: number,
    public homeGoalKicks: number,
    public homeThrowIns: number,
    public homeOffsides: number,
    public homeCorners: number,
    public homeShotsOnTarget: number,
    public homeShotsOffTarget: number,
    public homeAttemptsOnGoal: number,
    public homeSaves: number,
    public homeFauls: number,
    public homeTreatments: number,
    public homePenalties: number,
    public homeShotsBlocked: number,
    public homeDangerousAttacks: number,
    public homeAttacks: number,
    public awayYellowCards: number,
    public awayRedCards: number,
    public awaySubstitutions: number,
    public awayPossesion: number,
    public awayFreeKicks: number,
    public awayGoalKicks: number,
    public awayThrowIns: number,
    public awayOffsides: number,
    public awayCorners: number,
    public awayShotsOnTarget: number,
    public awayShotsOffTarget: number,
    public awayAttemptsOnGoal: number,
    public awaySaves: number,
    public awayFauls: number,
    public awayTreatments: number,
    public awayPenalties: number,
    public awayShotsBlocked: number,
    public awayDangerousAttacks: number,
    public awayAttacks: number,
  ) { }

  public getPercentage(stat: string): string {
    const team: string = stat.substr(0, 4);
    const home: number = team == 'home' ? this[stat] : this[stat.replace('away', 'home')];
    const away: number = team == 'away' ? this[stat] : this[stat.replace('home', 'away')];
    const total: number = home + away;
    const result: number = team == 'home' ? home / total : away / total;
    return Number((isNaN(result) ? 0 : result)).toFixed(2);
  }

}