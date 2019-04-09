import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent (Shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
      selector: 'app-hero',
      template: '<div></div>',
    })
    class FakeHeroComponent {
      @Input() hero: Hero;
      // @Output() delete = new EventEmitter();
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SuperDude', strength: 1 },
            { id: 2, name: 'WonderWoman', strength: 2 },
            { id: 3, name: 'AwesomeGuy', strength: 3 },
        ];

        mockHeroService = jasmine.createSpyObj(['deleteHero', 'addHero', 'getHeroes']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService,
                }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set herores correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });
});