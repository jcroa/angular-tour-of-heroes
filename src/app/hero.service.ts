import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  constructor() { }

  /* Returns an Observable object for getting of list of all heroes */
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

}
