import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Score } from '../models';
import { LivescoreService } from '../service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoresResolver implements Resolve<Observable<Score[]>> {

  constructor(private readonly livescoreService: LivescoreService) { }

  public resolve(): Observable<Score[]> {
    return this.livescoreService.getScores();
  }

}