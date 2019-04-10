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

    it(`should call heroservice.deleteHero when the Hero component's
        delete button is raised`, () => {
            // ARRANGE
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();

            // ACT
            const mockMethods = {
                stopPropagation: () => { }
            };
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            // ASSERT
            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it(`should call heroservice.deleteHero when the Hero component's
        delete button is clicked`, () => {
            // ARRANGE
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();

            // ACT
            const mockMethods = {
                stopPropagation: () => { }
            };
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // heroComponents[0].query(By.css('button')).triggerEventHandler('click', mockMethods);
            heroComponents[0].triggerEventHandler('delete', null);

            // ASSERT
            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });
});
