import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTextComponent } from './label-text.component';

describe('LabelTextComponent', () => {
  let component: LabelTextComponent;
  let fixture: ComponentFixture<LabelTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelTextComponent],
    });
    fixture = TestBed.createComponent(LabelTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
