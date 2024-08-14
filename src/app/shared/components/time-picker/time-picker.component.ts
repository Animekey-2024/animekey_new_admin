import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DateTime } from 'ts-luxon';
import { InputErrorPipe } from '../../pipes/input-error/input-error.pipe';
@Component({
  selector: 'app-time-picker',
  standalone: true,
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  imports: [
    CommonModule,
    NgxMatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    InputErrorPipe,
  ],
})
export class TimePickerComponent {
  @Input() controlName: any = '';
  @Input() form: any = FormGroup;
  @Input() placeholder = '';
  @Input() value = '';
  @Input() isDisabled = false;
  @Input() errorText: string = '';
  @Output() onTimeChange = new EventEmitter();

  // maxTime: DateTime = DateTime.local().set({
  //   hour: 16,
  // });
  // minTime: DateTime = DateTime.local().set({
  //   hour: 14,
  // });

  openFromIcon(timepicker: { open: () => void }) {
    timepicker.open();
  }

  onValueChange(value: any) {
    if (!!value) {
      this.onTimeChange.emit(value);
    }
  }
}
