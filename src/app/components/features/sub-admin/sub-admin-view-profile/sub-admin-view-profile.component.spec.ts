import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminViewProfileComponent } from './sub-admin-view-profile.component';

describe('SubAdminViewProfileComponent', () => {
  let component: SubAdminViewProfileComponent;
  let fixture: ComponentFixture<SubAdminViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubAdminViewProfileComponent],
    });
    fixture = TestBed.createComponent(SubAdminViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
