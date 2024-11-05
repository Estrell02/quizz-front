import { TestBed } from '@angular/core/testing';

import { QuizgameService } from './quizgame.service';

describe('QuizgameService', () => {
  let service: QuizgameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizgameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
