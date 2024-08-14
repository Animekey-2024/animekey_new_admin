import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'imagePlaceholder',
  standalone: true,
})
export class ImagePlaceholderPipe implements PipeTransform {
  transform(value: any, name: string): Observable<string> | null {
    let lastNameLetter = '';
    const splitName = name?.trim()?.split(' ');
    const firstNameLetter = splitName[0]?.charAt(0)
      ? splitName[0]?.charAt(0)
      : '';
    const lastLetterIndex = splitName?.length - 1;
    if (lastLetterIndex > 0) {
      lastNameLetter = splitName[lastLetterIndex]?.charAt(0)
        ? splitName[lastLetterIndex]?.charAt(0)
        : '';
    }
    const placeholder = (firstNameLetter + lastNameLetter)?.toUpperCase();
    if (!name) {
      return null;
    }
    return new Observable((observer) => {
      observer.next(placeholder);
    });
  }
}
