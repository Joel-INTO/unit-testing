import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('HeroesComponent (Deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

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
                HeroComponent,
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService,
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as a hero component', () => {
        // ARRANGE
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // ACT
        fixture.detectChanges();

        // ASSERT
        const heroComponentsDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentsDebugElements.length).toBe(3);

        // checks hero is set properly
        for (let i = 0; i < heroComponentsDebugElements.length; i++) {
            expect(heroComponentsDebugElements[i].componentInstance.hero.name).toEqual(HEROES[i].name);
        }
    });
});
