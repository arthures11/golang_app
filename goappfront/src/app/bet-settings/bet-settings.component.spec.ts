import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSettingsComponent } from './bet-settings.component';

describe('BetSettingsComponent', () => {
  let component: BetSettingsComponent;
  let fixture: ComponentFixture<BetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
