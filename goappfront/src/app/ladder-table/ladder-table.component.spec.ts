import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderTableComponent } from './ladder-table.component';

describe('LadderTableComponent', () => {
  let component: LadderTableComponent;
  let fixture: ComponentFixture<LadderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LadderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
