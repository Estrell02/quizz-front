import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListscoresComponent } from './listscores.component';

describe('ListscoresComponent', () => {
  let component: ListscoresComponent;
  let fixture: ComponentFixture<ListscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListscoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
