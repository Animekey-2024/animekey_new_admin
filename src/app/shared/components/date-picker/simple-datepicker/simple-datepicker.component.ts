import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorPipe } from '../../../pipes/input-error/input-error.pipe';
import { CustomDateAdapter } from '../customDateAdapter';

@Component({
  selector: 'app-simple-datepicker',
  standalone: true,
  templateUrl: './simple-datepicker.component.html',
  styleUrls: ['./simple-datepicker.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorPipe,
  ],
  providers: [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
})
export class SimpleDatepickerComponent {
  @Input() label: string = '';
  @Input() form: any = new FormGroup({});
  @Input() controlName = '';
  @Input() placeHolder = 'Choose a date';
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() errorText: string = '';
  @Output() sendDate = new EventEmitter();

  @Input() value = '';
  @Input() isDisabled = false;
  disabledPastDate: any;

  toggleDatePicker(value: boolean) {
    this.disabledPastDate = value ? this.minDate : '';
  }

  onDateChanged() {
    this.sendDate.emit(this.value);
  }
}
