import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetDetailModalComponent } from './bet-detail-modal.component';

describe('BetDetailModalComponent', () => {
  let component: BetDetailModalComponent;
  let fixture: ComponentFixture<BetDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
