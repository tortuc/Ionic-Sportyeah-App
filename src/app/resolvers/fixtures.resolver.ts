import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Fixture } from '../models';
import { LivescoreService } from '../service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixturesResolver implements Resolve<Observable<Fixture[]>> {

  constructor(private readonly livescoreService: LivescoreService) { }

  public resolve(): Observable<Fixture[]> {
    return this.livescoreService.getFixtures();
  }

}