import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
  }

  /* Returns an Observable object for getting of list of all heroes */
  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes

    //this.messageService.add('HeroService: fetched heroes');
    //return of(HEROES);

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleErrorDelegate("getHeroes", []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero

    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleErrorDelegate<Hero>(`getHero id=${id}`))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleErrorDelegate<T>(operationName = 'operation', result?: T) {
    // return a function that will handle the error
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operationName} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
