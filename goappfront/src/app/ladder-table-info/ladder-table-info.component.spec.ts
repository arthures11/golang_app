import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderTableInfoComponent } from './ladder-table-info.component';

describe('LadderTableInfoComponent', () => {
  let component: LadderTableInfoComponent;
  let fixture: ComponentFixture<LadderTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LadderTableInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadderTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
