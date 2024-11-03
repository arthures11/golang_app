import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulldepositHistoryModalComponent } from './fulldeposit-history-modal.component';

describe('FulldepositHistoryModalComponent', () => {
  let component: FulldepositHistoryModalComponent;
  let fixture: ComponentFixture<FulldepositHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FulldepositHistoryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulldepositHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
