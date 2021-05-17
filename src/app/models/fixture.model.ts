import { Moment } from 'moment';

export class Fixture {
  constructor(
    public time: Moment,
    public round: string,
    public homeName: string,
    public awayName: string,
    public location: string,
    public leagueId: number,
    public homeId: number,
    public awayId: number,
    public competitionId: number,
    public competition: any,
    public date: Moment,
  ) { }
}