import { AbstractControl } from '@angular/forms';

export class FormatFiltersData {
  start_date: string = '';
  end_date: string = '';
  is_active: string = '';
  org_id: string = '';
  role_id: string = '';
  primary_auth: string = '';
  is_created_by_system!: boolean;
  constructor(input?: AbstractControl) {
    this.start_date = input?.get('startDate')?.value;
    this.end_date = input?.get('endDate')?.value;
    this.org_id = input?.get('organization')?.value?.id;
    this.role_id = input?.get('role')?.value?.role_id;
    this.is_active = input?.get('is_active')?.value;
    this.primary_auth = input?.get('primary_auth')?.value;
    this.is_created_by_system = input?.get('is_created_by_system')?.value;
  }
}
