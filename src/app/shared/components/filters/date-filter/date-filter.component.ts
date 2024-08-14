import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { GLOBAL_DATE_FILTER_DATA } from '@constants/filter-data';
import { CustomDateInterface } from '@interface/common.interface';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [DatePipe],
})
export class DateFilterComponent implements OnInit {
  @ViewChild('fromDateCalendar') fromDateCalendar!: MatCalendar<Date>;
  @ViewChild('toDateCalendar') toDateCalendar!: MatCalendar<Date>;
  @ViewChild(MatMenuTrigger) dateFilterMenu!: MatMenuTrigger;
  selectedValue!: {
    key: string;
    value: CustomDateInterface;
    displayDate: string;
  };
  fromDate!: Date;
  toDate!: Date;
  showCalendar = false;
  dropDownValues = GLOBAL_DATE_FILTER_DATA;
  today = new Date();
  minDate = new Date(2023, 0, 1);

  @ViewChild('globalDateFilter') globalDateFilter!: MatMenu;

  _utilityService = inject(UtilityService);
  _dateService = inject(DatePipe);

  @Output() globalDateEvent = new EventEmitter();

  ngOnInit(): void {
    const index = this._utilityService.indexFinder(
      'lastWeek',
      GLOBAL_DATE_FILTER_DATA
    );
    this.setDate({
      key: GLOBAL_DATE_FILTER_DATA[index].key,
      value: GLOBAL_DATE_FILTER_DATA[index].value,
      displayDate: GLOBAL_DATE_FILTER_DATA[index].displayDate,
    });
  }

  eventStopPropagation(event: Event) {
    event.stopPropagation();
  }

  setDate(
    selected: { key: string; value: CustomDateInterface; displayDate: string },
    event?: Event
  ): void {
    event?.stopImmediatePropagation();
    const index = this.dropDownValues.findIndex(
      (item) => item.key === selected.key
    );
    if (index !== -1) {
      const customWeekIndex = this._utilityService.indexFinder(
        'custom',
        GLOBAL_DATE_FILTER_DATA
      );
      if (
        this.dropDownValues[index].key ===
        GLOBAL_DATE_FILTER_DATA[customWeekIndex].key
      ) {
        this.getDate(this.dropDownValues[index].key, '', false);
      } else {
        this.selectedValue = this.dropDownValues[index];
      }
    }
    this.updateDates(selected.key, selected.displayDate);
  }

  /**
   * Update toDate and fromDate based on the user selection
   * @param key
   */
  updateDates(key: string, displayDate: string): void {
    switch (key) {
      case 'today': {
        this.showCalendar = false;
        this.calculateTodayRange(key, displayDate);
        this.menuClose();
        break;
      }
      case 'yesterday': {
        this.showCalendar = false;
        this.calculateYesterdayRange(key, displayDate);
        this.menuClose();
        break;
      }
      case 'lastWeek': {
        this.showCalendar = false;
        this.calculateLast7Days(key, displayDate);
        break;
      }
      case 'lastMonth': {
        this.showCalendar = false;
        this.calculateLastMonthRange(key, displayDate);
        break;
      }
      case 'lastYear': {
        this.showCalendar = false;
        this.calculateLastYearRange(key, displayDate);
        break;
      }
      case 'custom': {
        this.showCalendar = true;
        break;
      }
      default: {
        this.calculateLast7Days(key, displayDate);
        break;
      }
    }
  }

  /**
   * Calculate Last 7 days
   */
  calculateLast7Days(key: string, displayDate: string): void {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate()); // Yesterday

    this.fromDate = sevenDaysAgo;
    this.toDate = endDate;
    this.getDate(key, displayDate);
    this.menuClose();
  }

  /**
   * Calculate the start date and end date of the last month from the current date
   */
  calculateLastMonthRange(key: string, displayDate: string): void {
    const today = new Date();

    // Calculate last month start date
    const lastMonthStartDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    this.fromDate = lastMonthStartDate;

    // Calculate last month end date
    const lastMonthEndDate = new Date(today.getFullYear(), today.getMonth(), 0);
    this.toDate = lastMonthEndDate;
    this.getDate(key, displayDate);
    this.menuClose();
  }

  /**
   * Calculate the start date and end date of the last year from the current date
   */
  calculateLastYearRange(key: string, displayDate: string): void {
    const today = new Date();

    // Calculate last year start date
    const lastYearStartDate = new Date(today.getFullYear() - 1, 0, 1);
    this.fromDate = lastYearStartDate;

    // Calculate last year end date
    const lastYearEndDate = new Date(today.getFullYear() - 1, 11, 31);
    this.toDate = lastYearEndDate;
    this.getDate(key, displayDate);
    this.menuClose();
  }

  /**
   * Calculate the start date and end date of the yesterday from the current date
   */
  calculateYesterdayRange(key: string, displayDate: string): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // Yesterday's date

    this.fromDate = new Date(yesterday);
    this.toDate = new Date(yesterday);
    this.getDate(key, displayDate);
  }

  /**
   * Calculate the start date and end date of the today from the current date
   */
  calculateTodayRange(key: string, displayDate: string) {
    const today = new Date();

    this.fromDate = new Date(today);
    this.toDate = new Date(today);
    this.getDate(key, displayDate);
  }

  /**
   * @function getDate function is used to create the date format for custom selection and also emit the value for the listing and stats
   * @param key by default it will be custom
   * @param displayDate by default it will be blank string
   */
  getDate(key: string, displayDate: string, isClose?: boolean): void {
    const customDateValue = {
      fromDate: this._utilityService.changeDateFormat(this.fromDate),
      toDate: this._utilityService.changeDateFormat(this.toDate),
    };

    const index = this._utilityService.indexFinder(
      'custom',
      GLOBAL_DATE_FILTER_DATA
    );

    const customDisplayDate =
      key === GLOBAL_DATE_FILTER_DATA[index].key
        ? `${this._dateService.transform(
            this.fromDate,
            'mediumDate'
          )} - ${this._dateService.transform(this.toDate, 'mediumDate')}`
        : displayDate;

    this.selectedValue = {
      key,
      value: customDateValue,
      displayDate: customDisplayDate,
    };

    if (key != GLOBAL_DATE_FILTER_DATA[index].key) {
      this.globalDateEvent.emit(this.selectedValue);
    }
    if (isClose) {
      this.globalDateEvent.emit(this.selectedValue);
      this.menuClose();
    }
  }

  onFromDateChange(event: Date) {
    if (event) {
      this.toDate = new Date();
    }
  }

  menuClose() {
    if (this.dateFilterMenu) {
      this.dateFilterMenu.closeMenu();
    }
  }
}
