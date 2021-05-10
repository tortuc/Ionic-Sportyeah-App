export class Score {
  constructor(
    public date: Date, // TODO: Handle with MomentJS
    public league: string,
    public round: number,
    public time: string,
    public homeGoals: number,
    public awayGoals: number,
    public location: string,
    public stadium: string
  ) { }
}