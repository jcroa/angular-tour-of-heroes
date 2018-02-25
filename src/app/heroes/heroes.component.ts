import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // instance fields

  heroes: Hero[];

  selectedHero: Hero;
  
  constructor(private heroService: HeroService) { }

  // public methods

  ngOnInit() {
    this.refreshHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /* Async operation */
  refreshHeroes(): void {
    var obs = this.heroService.getHeroes();
    obs.subscribe(heroes => this.heroes = heroes);
  }

}
