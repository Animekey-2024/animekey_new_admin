import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormatFiltersData } from '@models/filters.model';
import { SearchComponent } from '@shared/components/search/search.component';
import { ICONS } from '@enums/icons.enum';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { SimpleDatepickerComponent } from '@shared/components/date-picker/simple-datepicker/simple-datepicker.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { STATUS_DATA } from '@constants/filter-data';
import { CommonSelectComponent } from '../../../../shared/components/common-select/common-select.component';

const materials = [
  MatDatepickerModule,
  MatExpansionModule,
  MatDividerModule,
  MatMenuModule,
  MatIconModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  ButtonComponent,
  MatDividerModule,
];

@Component({
  selector: 'app-role-filter',
  standalone: true,
  templateUrl: './role-filter.component.html',
  styleUrls: ['./role-filter.component.scss'],
  imports: [
    CommonModule,
    ...materials,
    ReactiveFormsModule,
    SearchComponent,
    LabelTextComponent,
    SimpleDatepickerComponent,
    CommonSelectComponent,
  ],
})
export class RoleFilterComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() changeFilter = new EventEmitter();
  @Output() applyFilters = new EventEmitter();
  filterForm!: FormGroup;
  filtersActive = false;
  placeHolder = 'Search by Role Name, Role ID';
  ICONS = ICONS;
  btnSlug = BUTTON_SLUGS;
  fromMaxDate = new Date();
  toMaxDate = new Date();
  toMindate!: Date;
  status = STATUS_DATA;
  @Output() searchFilterChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.filterForm = this.fb.group({
      isActive: ['all'],
    });
  }

  submit() {
    if (this.filterForm.touched) {
      this.markFilterAsApplied();
      this.applyFilters.emit(new FormatFiltersData(this.filterForm));
    }
  }

  markFilterAsApplied() {
    this.filtersActive = true;
  }

  markFilterAsNotApplied() {
    this.filtersActive = false;
  }

  /**
   * apply filter here
   */
  filterData() {
    this.filtersActive = this.checkControlValue();
    if (!!this.filtersActive) {
      this.changeFilter.emit(this.filterForm.value);
      this.closeMenu();
    }
  }

  /**
   * reset filter here
   */
  filterReset() {
    this.filterForm.reset();
    if (!!this.filtersActive) {
      this.changeFilter.emit();
    }
    this.filtersActive = this.checkControlValue();
    this.filterForm.patchValue({
      isActive: 'all',
    });
    this.filterForm.updateValueAndValidity();
    this.closeMenu();
  }
  /**
   * It checks whether control has value or not (if yes then value is true else false)
   * @returns
   */
  checkControlValue(): boolean {
    return this.filterForm.dirty;
  }

  /**
   * When search filter applied
   * @param value
   */
  searchFilter(value: string) {
    this.searchFilterChange.emit(value);
  }

  closeMenu() {
    this.trigger.closeMenu();
  }

  /**
   * Get the control values from common component
   * @param value
   * @param control
   */
  setValue(value: string, control: string) {
    this.filterForm.controls[control].setValue(value);
  }
}
