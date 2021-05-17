import { Moment } from 'moment';

export class Score {
  constructor(
    public id: number,
    public homeName: string,
    public awayName: string,
    public score: string,
    public htScore: string,
    public ftScore: string,
    public etScore: string,
    public time: number,
    public leagueId: number,
    public leagueName: string,
    public added: Moment,
    public lastChanged: Moment,
    public status: string,
    public homeId: number,
    public awayId: number,
    public events: string,
    public competitionId: number,
    public competitionName: string,
    public location: string,
    public fixtureId: number,
    public scheduled: Moment
  ) { }
}