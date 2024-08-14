import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryLinkComponent } from './expiry-link.component';

describe('ExpiryLinkComponent', () => {
  let component: ExpiryLinkComponent;
  let fixture: ComponentFixture<ExpiryLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiryLinkComponent],
    });
    fixture = TestBed.createComponent(ExpiryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
