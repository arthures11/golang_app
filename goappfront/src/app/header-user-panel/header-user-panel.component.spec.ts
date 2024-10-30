import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserPanelComponent } from './header-user-panel.component';

describe('HeaderUserPanelComponent', () => {
  let component: HeaderUserPanelComponent;
  let fixture: ComponentFixture<HeaderUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderUserPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
