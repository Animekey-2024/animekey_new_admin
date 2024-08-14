import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationTickComponent } from './verification-tick.component';

describe('VerificationTickComponent', () => {
  let component: VerificationTickComponent;
  let fixture: ComponentFixture<VerificationTickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerificationTickComponent],
    });
    fixture = TestBed.createComponent(VerificationTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
