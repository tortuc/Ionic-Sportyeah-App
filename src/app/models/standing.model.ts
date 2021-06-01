export class Standing {
  constructor(
    public leagueId: number,
    public seasonId: number,
    public name: string,
    public rank: number,
    public points: number,
    public matches: number,
    public goalDiff: number,
    public goalsScored: number,
    public goalsConceded: number,
    public lost: number,
    public drawn: number,
    public won: number,
    public teamId: number,
    public competitionId: number,
  ) { }
}