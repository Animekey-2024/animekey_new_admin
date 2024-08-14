import { Directive, HostListener } from '@angular/core';
import { Regex } from '@constants/regex';

@Directive({
  selector: '[appDisallowSpecialCharacter]',
  standalone: true,
})
export class DisallowSpecialCharacterDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);

    // Regular expression to match special characters
    const specialCharRegex = Regex.SPECIAL_CHARS;

    // If the pressed key is a special character, prevent its entry
    if (specialCharRegex.test(char)) {
      event.preventDefault();
    }
  }
}
