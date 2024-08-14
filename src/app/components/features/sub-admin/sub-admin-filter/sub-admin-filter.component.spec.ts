import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminFilterComponent } from './sub-admin-filter.component';

describe('SubAdminFilterComponent', () => {
  let component: SubAdminFilterComponent;
  let fixture: ComponentFixture<SubAdminFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubAdminFilterComponent],
    });
    fixture = TestBed.createComponent(SubAdminFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
