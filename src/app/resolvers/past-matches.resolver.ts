import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PastMatch } from '../models';
import { LivescoreService } from '../service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PastMatchesResolver implements Resolve<Observable<PastMatch[]>> {

  constructor(private readonly livescoreService: LivescoreService) { }

  public resolve(): Observable<PastMatch[]> {
    return this.livescoreService.getPastMatches();
  }

}