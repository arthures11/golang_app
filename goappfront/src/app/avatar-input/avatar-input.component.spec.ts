import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarInputComponent } from './avatar-input.component';

describe('AvatarInputComponent', () => {
  let component: AvatarInputComponent;
  let fixture: ComponentFixture<AvatarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
