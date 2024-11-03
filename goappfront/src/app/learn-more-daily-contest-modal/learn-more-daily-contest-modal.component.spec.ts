import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMoreDailyContestModalComponent } from './learn-more-daily-contest-modal.component';

describe('LearnMoreDailyContestModalComponent', () => {
  let component: LearnMoreDailyContestModalComponent;
  let fixture: ComponentFixture<LearnMoreDailyContestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnMoreDailyContestModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnMoreDailyContestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
