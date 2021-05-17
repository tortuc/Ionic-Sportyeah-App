import { Moment } from 'moment';

export class PastMatch {
  constructor(
    public id: number,
    public date: Moment,
    public homeName: string,
    public awayName: string,
    public htScore: string,
    public ftScore: string,
    public etScore: string,
    public time: string,
    public leagueId: number,
    public status: string,
    public added: Moment,
    public lastChanged: Moment,
    public homeId: number,
    public awayId: number,
    public competitionId: number,
    public competitionName: string,
    public location: string,
    public fixtureId: number,
    public scheduled: Moment
  ) { }
}