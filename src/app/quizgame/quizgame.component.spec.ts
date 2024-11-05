import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizgameComponent } from './quizgame.component';

describe('QuizgameComponent', () => {
  let component: QuizgameComponent;
  let fixture: ComponentFixture<QuizgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizgameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
