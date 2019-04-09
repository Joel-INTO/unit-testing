import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
    let mockMessagingService;
    let httpTestingController: HttpTestingController;

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
    });
});
