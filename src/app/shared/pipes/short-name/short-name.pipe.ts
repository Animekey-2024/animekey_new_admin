import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
  standalone: true,
})
export class ShortNamePipe implements PipeTransform {
  transform(fullName: string): any {
    if (fullName != 'N/A') {
      fullName = fullName.replace(/\s+/g, ' ').trim();
      const name = fullName.split(' ');
      if (name.length > 1) {
        return `${name[0][0]}${name[1][0]}`;
      }
      return name[0][0];
    } else return '';
  }
}
