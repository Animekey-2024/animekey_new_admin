import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperTextComponent } from './helper-text.component';

describe('HelperTextComponent', () => {
  let component: HelperTextComponent;
  let fixture: ComponentFixture<HelperTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelperTextComponent],
    });
    fixture = TestBed.createComponent(HelperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
