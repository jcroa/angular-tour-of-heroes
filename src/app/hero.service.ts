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
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
  }

  /* Returns an Observable object for getting of list of all heroes */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleErrorDelegate("getHeroes", []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleErrorDelegate<Hero>(`getHero id=${id}`))
      )
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleErrorDelegate<any>('updateHero'))
      );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    // hero.id is undefined.
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        /* hero.id will be a new value */
        tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleErrorDelegate<Hero>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleErrorDelegate<Hero>('deleteHero'))
      );
  }

  /**
   * Return a function for error handling when a http operation fails.
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
