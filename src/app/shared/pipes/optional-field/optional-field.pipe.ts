import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionalField',
  standalone: true,
})
export class OptionalFieldPipe implements PipeTransform {
  transform(value: any, optionalText: string = 'N/A'): unknown {
    if (value?.toString()?.trim()) {
      return value;
    } else return optionalText;
  }
}
