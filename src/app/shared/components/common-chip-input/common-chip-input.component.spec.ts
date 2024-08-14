import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonChipInputComponent } from './common-chip-input.component';

describe('CommonChipInputComponent', () => {
  let component: CommonChipInputComponent;
  let fixture: ComponentFixture<CommonChipInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonChipInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonChipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
