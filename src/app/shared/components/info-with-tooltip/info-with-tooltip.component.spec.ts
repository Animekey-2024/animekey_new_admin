import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWithTooltipComponent } from './info-with-tooltip.component';

describe('InfoWithTooltipComponent', () => {
  let component: InfoWithTooltipComponent;
  let fixture: ComponentFixture<InfoWithTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoWithTooltipComponent],
    });
    fixture = TestBed.createComponent(InfoWithTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
