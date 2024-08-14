import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPermissionsComponent } from './select-permissions.component';

describe('SelectPermissionsComponent', () => {
  let component: SelectPermissionsComponent;
  let fixture: ComponentFixture<SelectPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectPermissionsComponent],
    });
    fixture = TestBed.createComponent(SelectPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
