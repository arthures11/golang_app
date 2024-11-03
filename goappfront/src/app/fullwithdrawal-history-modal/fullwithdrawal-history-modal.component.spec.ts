import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullwithdrawalHistoryModalComponent } from './fullwithdrawal-history-modal.component';

describe('FullwithdrawalHistoryModalComponent', () => {
  let component: FullwithdrawalHistoryModalComponent;
  let fixture: ComponentFixture<FullwithdrawalHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullwithdrawalHistoryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullwithdrawalHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
