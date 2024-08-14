import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatConversion',
  standalone: true,
})
export class DateFormatConversionPipe implements PipeTransform {
  locale = 'en-US';
  transform(value: string, dateFormat: string) {
    return formatDate(value, dateFormat, this.locale);
  }
}
