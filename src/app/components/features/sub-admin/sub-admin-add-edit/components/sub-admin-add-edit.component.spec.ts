import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminAddEditComponent } from './sub-admin-add-edit.component';

describe('SubAdminAddEditComponent', () => {
  let component: SubAdminAddEditComponent;
  let fixture: ComponentFixture<SubAdminAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubAdminAddEditComponent],
    });
    fixture = TestBed.createComponent(SubAdminAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
