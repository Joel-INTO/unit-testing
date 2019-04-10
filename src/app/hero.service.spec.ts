import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
    let mockMessagingService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessagingService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                {
                    provide: MessageService,
                    useValue: mockMessagingService,
                }
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        heroService = TestBed.get(HeroService);
    });

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            // ARRANGE
            const fakeHero = { id: 4, name: 'SuperDude', strength: 100};

            // ASSERT
            heroService.getHero(4).subscribe(data => {
                expect(data.name).toContain(fakeHero.name);
            });
            const req = httpTestingController.expectOne('api/heroes/4');

            // ACT
            req.flush(fakeHero);
            httpTestingController.verify();
        });
    });
});
