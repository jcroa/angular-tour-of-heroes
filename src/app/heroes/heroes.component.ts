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
  
  constructor(private heroService: HeroService) { }

  // public methods

  ngOnInit() {
    this.refreshHeroes();
  }

  /* Async operation. old name was getHeroes */
  refreshHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    // remove spaces from begining and ending
    name = name.trim();
    if (!name) { 
      // TODO - show message. No name has been written
      return; 
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    var _this = this;
    var elem = document.getElementById("hero-" + hero.id);
    if (elem) {
      elem.classList.add("deleting");
    }
    // TODO - add class for render hero "obscured"
    this.heroService.deleteHero(hero).subscribe(
      () => {
        _this.heroes = _this.heroes.filter(h => h !== hero);
        alert(hero.name + " has been deleted");
      }
    );
  }

}
