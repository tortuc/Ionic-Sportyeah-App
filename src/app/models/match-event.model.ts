export class MatchEvent {
  constructor(
    public id: number,
    public matchId: number,
    public player: string,
    public time: number,
    public event: string,
    public sort: number,
    public homeAway: string,
    public info: any
  ) { }
}