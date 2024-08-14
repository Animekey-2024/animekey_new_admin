import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SimpleDatepickerComponent } from '@shared/components/date-picker/simple-datepicker/simple-datepicker.component';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { SearchComponent } from '@shared/components/search/search.component';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { ICONS } from '@enums/icons.enum';
import { STATUS_DATA, VERIFICATION_STATUS } from '@constants/filter-data';
import { MatDividerModule } from '@angular/material/divider';
import { CommonSelectComponent } from '@shared/components/common-select/common-select.component';

@Component({
  selector: 'app-sub-admin-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleDatepickerComponent,
    SearchComponent,
    ButtonComponent,
    MatIconModule,
    LabelTextComponent,
    MatDividerModule,
    CommonSelectComponent,
  ],
  templateUrl: './sub-admin-filter.component.html',
  styleUrls: ['./sub-admin-filter.component.scss'],
})
export class SubAdminFilterComponent {
  @ViewChild(MatMenuTrigger) trigger: any = MatMenuTrigger;
  @Output() changeFilter = new EventEmitter();
  @Output() searchFilterChange = new EventEmitter();

  btnSlug = BUTTON_SLUGS;
  iconEnum = ICONS;
  form: any = FormGroup;

  placeHolder = 'Search by Sub Admin ID, Name, Email ID';
  isFilterApplied = false;
  fromMaxDate = new Date();
  toMaxDate = new Date();
  toMinDate!: Date;

  statusData = STATUS_DATA;

  verificationStatusData = VERIFICATION_STATUS;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }
  /**
   * form initialization here
   */

  formInit() {
    this.form = this._fb.group({
      isActive: ['all'],
    });
  }

  /**
   *
   * @param value set value of a field
   * @param control according to the its control name
   */
  setValue(value: string, control: string) {
    this.form.controls[control].setValue(value);
  }

  /**
   * apply filter here
   */
  filterData() {
    this.isFilterApplied = this.checkControlValue();
    if (!!this.isFilterApplied) {
      this.changeFilter.emit(this.form.value);

      this.closeMenu();
    }
  }
  /**
   * reset filter here
   */
  filterReset() {
    this.form.reset();
    if (!!this.isFilterApplied) {
      this.changeFilter.emit();
    }
    this.isFilterApplied = this.checkControlValue();
    this.form.patchValue({
      isActive: 'all',
    });
    this.form.updateValueAndValidity();
    this.closeMenu();
  }

  /**
   *
   * @param value when search filter applied
   */
  searchFilter(value: string) {
    this.searchFilterChange.emit(value);
  }

  checkControlValue() {
    /** it checks whether control has value or not (if yes then value is true else false)  */
    return this.form.dirty;
  }

  closeMenu() {
    this.trigger.closeMenu();
  }
}
