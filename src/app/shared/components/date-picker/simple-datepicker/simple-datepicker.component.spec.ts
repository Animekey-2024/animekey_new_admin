import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDatepickerComponent } from './simple-datepicker.component';

describe('SimpleDatepickerComponent', () => {
  let component: SimpleDatepickerComponent;
  let fixture: ComponentFixture<SimpleDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimpleDatepickerComponent],
    });
    fixture = TestBed.createComponent(SimpleDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
